# Auditoria Técnica — Portfolio Pedro Braga

Data: 2026-07-16  
Escopo: código ativo, build, deploy, documentação e legado versionado.  
Objetivo confirmado: apresentar Pedro Braga, suas competências, experiências e projetos com rapidez, acessibilidade e credibilidade para recrutadores e clientes.

## Resumo executivo

O produto deve continuar como site estático. Não existe justificativa atual para backend, banco, autenticação ou painel administrativo. A base visual é profissional e o custo operacional do frontend ativo é baixo, mas o repositório acumulou escopo arquivado, documentação contraditória, arquivos monolíticos e promessas sem evidência. Antes desta auditoria, o deploy publicava a interface administrativa arquivada, a 404 quebrava em JavaScript, assets mutáveis tinham cache de até um ano e o build não era reproduzível.

As correções de hardening mais urgentes foram implementadas nesta revisão. O próximo ganho relevante virá de simplificação, não de novas features.

### Status após remediação

- Legado, `default.php`, bancos e documentação obsoleta removidos do repositório.
- Widgets de atividade, código comentado, CTAs falsos e métricas não verificáveis removidos.
- 404, CSP, cache, i18n, lightbox, dependências e build corrigidos.
- Build, smoke tests, integridade de links e `npm audit` aprovados.
- Deploy automático aprovado e produção verificada em 2026-07-16.
- `/archive/`, `/backend/` e `default.php` retornam 403; rota inexistente retorna a 404 customizada.

## Se este projeto fosse meu, eu manteria apenas isso

- Landing page estática com apresentação, competências, formação e contato.
- Três ou quatro projetos realmente verificáveis, com contexto, contribuição pessoal, stack e links válidos.
- Currículo PT/EN.
- Blog estático em Markdown, desde que os artigos continuem sendo publicados.
- Tema claro/escuro, tradução PT/EN e acessibilidade essencial.
- FormSubmit como integração externa documentada, sem backend próprio.
- Um único pipeline de build e deploy.

## Eu removeria imediatamente

- `archive/future-continuation-2026-04-10/` da árvore principal. O Git já preserva histórico; hoje o diretório inclui admin, backend e bancos SQLite.
- `default.php`, resíduo da tela padrão da Hostinger.
- Widgets de GitHub/WakaTime da home; são dependências de terceiros, métricas de vaidade e distraem da prova de impacto.
- CTAs sem destino e estados “em breve”. Nesta revisão eles foram ocultados; a próxima limpeza deve removê-los do markup/dados.
- Métricas não auditáveis (`90%`, `100h+/mês`, `-60%`) até existir fonte, método ou evidência no case.
- Planos de backend/admin da documentação ativa.

## Achados por área

### Produto e anti-feature creep

O MVP é uma página institucional com prova de competência. O painel admin, API Express, JWT, SQLite, GitHub token no navegador e páginas paralelas de projeto não pertencem ao MVP. Esse escopo existe como tentativa de transformar um portfólio estático em CMS/plataforma, mas gera superfície de ataque, dependências, documentação e operação sem melhorar a conversão principal. Deve ser removido agora da árvore de trabalho; se um CMS se tornar necessário, a decisão deve nascer de uma necessidade medida.

O blog é adjacente ao objetivo e pode ficar, mas só se houver cadência. Dois posts não justificam aumentar arquitetura. Os widgets de atividade não comprovam senioridade e devem sair.

### Estrutura e arquitetura

- `index.html` tem mais de 1.200 linhas e mistura conteúdo, SVGs, modais e estrutura de todas as seções.
- `css/style.css` tem mais de 2.800 linhas, regras repetidas e várias definições posteriores para os mesmos componentes.
- `js/main.js` concentra tema, navegação, animação, formulário, métricas, modal, galeria, lightbox e vídeo. É um God Script.
- `content.json` duplica fallback HTML; `translations.json` adiciona uma terceira fonte de verdade para partes do conteúdo.
- Arquivos fonte e `.min.*` são versionados. Isso é aceitável para hospedagem simples, mas exige teste de build limpo para evitar divergência.

Estrutura alvo BragaCode:

```text
/.github/workflows
/docs
/src
  /styles
  /scripts
  /content
/tests
/scripts
/public
README.md
CHANGELOG.md
ROADMAP.md
ARCHITECTURE.md
CONTRIBUTING.md
LICENSE
```

Não migrar para framework. Primeiro dividir o JavaScript por responsabilidade e consolidar CSS; o build pode copiar/minificar para `public/`.

### Código

- A 404 carregava `main.js`, que assumia a existência do menu e lançava exceção em `menuToggle.addEventListener`. Corrigido removendo o script desnecessário.
- `content-loader.js` e `i18n.js` faziam `fetch` concorrente. Dependendo da ordem da rede, conteúdo em português podia sobrescrever a seleção em inglês. Corrigido com o evento `portfolio:content-loaded` e reaplicação idempotente.
- Links `href="#"` eram transformados em controles desabilitados no runtime, mas continuavam visíveis. Corrigido visualmente; remover o markup morto na próxima fase.
- `sanitizeText` não sanitiza; apenas normaliza tipo. O uso atual de `textContent` é seguro, mas o nome é enganoso e deve virar `asText`.
- `renderContactFeedback` usa `innerHTML = ''` apenas para limpeza. Não há XSS nessa linha, porém `replaceChildren()` comunica melhor a intenção.
- Comentários de numeração estão inconsistentes (`9`, `10`, `10.5`, `13`) e mostram crescimento incremental do arquivo.
- Não foram encontrados `TODO`, `FIXME`, `eval` ou secrets ativos no frontend.

### Performance

- O site é estático e os assets próprios são pequenos; essa é a principal decisão correta.
- CSS sem fingerprint recebia cache de um ano em produção. Isso podia manter layout antigo após deploy. Corrigido para uma hora enquanto não houver nomes com hash.
- As três imagens remotas de GitHub/WakaTime aumentam dependência, privacidade e variabilidade de layout.
- O CDN de ícones adiciona conexão e CSS externo para tecnologias que poderiam usar texto ou SVG local.
- Há múltiplos listeners de scroll; são throttled ou usam `requestAnimationFrame`, portanto não há gargalo grave, mas podem ser consolidados.
- O modal cria mídia sob demanda, o que é adequado.
- Não há backend, queries, N+1, overfetch de API de negócio ou cache de banco no runtime ativo.

### Segurança

- O admin arquivado estava acessível publicamente em produção e solicitava token GitHub. O deploy agora exclui `archive/`, a Vercel ignora o diretório e o Apache retorna 403 para esse prefixo. É necessário um deploy e limpeza do servidor para retirar a cópia já publicada.
- O tema era um script inline incompatível com a CSP vigente. Foi extraído para arquivo próprio.
- `npm audit` tinha uma vulnerabilidade alta em `marked` e uma moderada transitiva. Ambas foram corrigidas; resultado atual: zero.
- A CSP, HSTS, `nosniff`, frame policy e referrer policy estão presentes em produção.
- Não há autenticação, cookies, JWT, uploads, API própria, CSRF, SQL ou NoSQL no escopo ativo; esses tópicos são não aplicáveis, não “implementados”.
- O formulário envia nome, e-mail e mensagem para FormSubmit. Isso exige aviso de privacidade claro e registro do operador externo.
- Markdown é confiável apenas porque vem do repositório. Se autores externos puderem editar posts, `marked.parse` precisa de sanitização HTML.

### Banco e API

Não existem banco ou API ativos. A arquitetura correta é continuar sem ambos. Os arquivos SQLite, WAL e SHM arquivados devem ser removidos do repositório e avaliados quanto a dados reais antes da remoção definitiva. Não criar modelagem, índices, versionamento REST ou DTOs para um problema inexistente.

### Frontend, UX e acessibilidade

- Hierarquia visual, tema, foco visível, skip link, modal com trap de foco e `prefers-reduced-motion` são pontos positivos.
- A home tenta falar ao mesmo tempo com recrutador e cliente. A mensagem principal deve escolher “Software Engineer” e tratar serviços como informação secundária.
- Seis projetos diluem os melhores casos. Exibir apenas os que têm evidência e links.
- Cards inteiros com `tabindex=0` mais links internos criam interações aninhadas pouco intuitivas. Preferir um link explícito “Ver case”.
- Lightbox não tem `role="dialog"`, `aria-modal`, foco inicial/restauração ou `aria-hidden` sincronizado.
- Progresso da formação é visual, sem semântica de progressbar.
- Os alvos do header ficam abaixo de 44 px em parte dos breakpoints.
- A imagem vazia do lightbox aparece como recurso quebrado em auditorias automatizadas; usar o atributo `hidden` e só definir `src` ao abrir.
- A 404 tinha favicon quebrado e erro JavaScript; corrigido.

### DevOps e qualidade

- Existe deploy automático, `npm ci` e build, mas nenhum gate de teste antes desta revisão.
- Smoke tests foram adicionados e agora fazem parte de `npm run build`.
- O build usava a hora atual para RSS/sitemap, alterando arquivos a cada execução. Agora usa `SOURCE_DATE_EPOCH` ou a data mais recente dos posts; duas execuções geraram hashes idênticos.
- Falta lint, formatação, validação HTML e teste de links.
- GitHub Actions usa actions fixadas por major/tag, não por SHA. Para maior rigor de supply chain, fixar por commit e habilitar Dependabot.
- Commits recentes não seguem consistentemente Conventional Commits.
- Não há Docker e ele não é necessário para este site.
- Não há observabilidade além do Google Analytics; para site estático, uptime externo e alertas de deploy bastam.

### Documentação

README e `docs/` existem, porém estão contraditórios: versões v1.0 RC, v1.5, v1.7 e v1.8 aparecem como atuais; documentos descrevem `/admin`, API e fallback interno que não fazem parte do runtime. A documentação superestima o estado do produto.

Criar ou consolidar na raiz: `CHANGELOG.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `SECURITY.md` e `DEPLOY.md`. Remover `PLANOS.md` ou reduzi-lo a backlog enxuto. Manter uma única versão atual.

## Priorização

| Prioridade | Problema | Impacto | Complexidade | Estimativa | Categoria | Estado |
|---|---|---:|---:|---:|---|---|
| P0 | Admin arquivado público | Crítico | Baixa | 1 h + deploy | Segurança | Corrigido no código; falta deploy/limpeza remota |
| P0 | Dependências vulneráveis | Alto | Baixa | 30 min | Supply chain | Corrigido |
| P0 | Cache longo sem fingerprint | Alto | Baixa | 30 min | Deploy | Mitigado |
| P1 | 404 com exceção e favicon quebrado | Médio | Baixa | 20 min | Qualidade | Corrigido |
| P1 | Corrida conteúdo/i18n | Médio | Baixa | 45 min | Código | Corrigido |
| P1 | Build não reproduzível | Médio | Média | 1 h | DevOps | Corrigido |
| P1 | Ausência de testes | Alto | Média | 1–2 dias | Qualidade | Smoke inicial criado |
| P1 | Arquivo legado/bancos no Git | Alto | Baixa | 1 h | Organização | Corrigido |
| P1 | Métricas sem evidência | Alto | Média | 1 dia | Produto | Corrigido |
| P2 | God Script e CSS monolítico | Médio | Alta | 3–5 dias | Arquitetura | Pendente |
| P2 | Documentação contraditória | Médio | Média | 1–2 dias | Docs | Corrigido |
| P2 | Widgets de terceiros | Médio | Baixa | 2 h | Performance/Produto | Corrigido |
| P2 | Semântica dos cards/lightbox | Médio | Média | 1 dia | Acessibilidade | Corrigido |
| P3 | Estrutura fora do BragaCode | Baixo | Média | 1–2 dias | Organização | Pendente |

## Milestones, epics, issues e tasks

### v1.8.1 — Production hardening

Epic: fechar riscos imediatos.

1. **Bloquear e retirar legado público**
   - Aplicar regra 403 e exclusões de deploy.
   - Executar deploy.
   - Apagar `/archive/` já existente no servidor.
   - Confirmar 403/404 por HTTP.
2. **Corrigir integridade do build**
   - Atualizar dependências.
   - Garantir `npm audit` limpo.
   - Garantir duas builds idênticas.
3. **Corrigir regressões básicas**
   - Smoke test da 404.
   - Smoke test de assets/config.
   - Gate no CI.

### v1.9.0 — Simplificação

Epic: reduzir escopo e fontes de verdade.

4. **Remover arquivo legado do repositório**
   - Verificar se bancos contêm dados reais.
   - Exportar apenas o que for obrigatório.
   - Excluir `archive/` e `default.php`.
5. **Curar portfólio**
   - Selecionar até quatro projetos.
   - Remover links e estados vazios.
   - Validar cada métrica com evidência.
6. **Remover widgets de atividade**
   - Excluir GitHub Stats/WakaTime da home.
   - Medir redução de requests e layout shift.

### v2.0.0 — Base sustentável

Epic: melhorar manutenção sem framework.

7. **Modularizar JavaScript**
   - Separar navigation, theme, contact, projects/modal e accessibility.
   - Definir bootstrap único.
   - Testar cada módulo.
8. **Consolidar CSS**
   - Remover seletores duplicados.
   - Separar tokens/base/componentes/páginas.
   - Adicionar lint e orçamento de tamanho.
9. **Reestruturar no padrão BragaCode**
   - Mover fonte para `src/` e saída para `public/`.
   - Manter `tests/`, `scripts/`, `docs/` e `.github/`.
   - Documentar decisões em ADR curto.
10. **Reescrever documentação**
    - Uma versão atual.
    - Arquitetura real, deploy real e segurança real.
    - Changelog e contribuição.

## Roadmap de refatoração

1. **Limpeza:** deploy das correções, remoção remota/local do archive, default.php, widgets e CTAs mortos.
2. **Arquitetura:** modularizar JS/CSS e consolidar fontes de conteúdo.
3. **Performance:** fingerprint de assets, orçamento, imagens e remoção de terceiros.
4. **Segurança:** privacidade do formulário, sanitização condicional de Markdown, pin de actions.
5. **Documentação:** alinhar README, arquitetura, deploy, segurança e changelog.
6. **Testes:** HTML, links, acessibilidade, build e smoke browser em desktop/mobile.
7. **Deploy:** ambiente de preview, gate obrigatório e teste pós-deploy.
8. **Novas funcionalidades:** somente após métricas mostrarem necessidade; backend/admin continuam fora do roadmap.

## Notas após remediação e deploy

| Área | Nota | Justificativa |
|---|---:|---|
| Arquitetura | 7,5 | Stack adequada e escopo estático claro; JS/CSS continuam monolíticos. |
| Escalabilidade | 8,0 | Site estático e CDN escalam bem; pipeline é simples e reproduzível. |
| Legibilidade | 7,0 | Legado e código morto removidos; arquivos principais ainda são grandes. |
| Manutenção | 7,5 | Build, smoke tests e documentação estão alinhados; falta modularização gradual. |
| Performance | 8,0 | Site leve, cache corrigido e widgets removidos; CDN de ícones permanece. |
| Segurança | 8,5 | Headers, CSP, dependências, Actions e caminhos legados verificados em produção. |
| Qualidade do código | 7,5 | DOM seguro, PT/EN consistente e acessibilidade melhorada; testes ainda são smoke. |
| Organização | 8,0 | Archive, bancos e documentação conflitante removidos; layout raiz continua por compatibilidade. |
| Documentação | 8,5 | Arquitetura, deploy, segurança, contribuição e changelog refletem o produto real. |
| Prontidão para produção | 9,0 | Build e deploy aprovados; home, blog, 404, headers e bloqueios validados remotamente. |

**Nota original: 5,9/10. Nota final após remediação e verificação em produção: 8,0/10.**

## Veredito técnico

O portfólio tem uma boa fundação visual e escolheu a tecnologia certa, mas tentou carregar ambições de CMS e plataforma que não pertencem ao produto. A decisão profissional é reduzir: menos projetos, menos métricas promocionais, menos terceiros, nenhum backend e documentação verdadeira. As correções desta revisão retiram riscos imediatos; a versão realmente madura virá da remoção do legado e da modularização controlada, não da adição de recursos.

## Próximos passos, em ordem

1. Modularizar `main.js` e consolidar `style.css` em mudanças pequenas.
2. Adicionar validação HTML e acessibilidade mais profunda ao CI.
3. Implementar fingerprint de assets antes de voltar a usar cache imutável para CSS/JS.
4. Adicionar preview de deploy para mudanças visuais.
