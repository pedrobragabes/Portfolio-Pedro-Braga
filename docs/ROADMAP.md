# Roadmap - Portfolio Pedro Braga

> Ultima atualizacao: 2026-04-10

---

## Versoes Concluidas

### v1.1.0 - Polimento e Novas Features
- [x] Skills Marquee: Carrossel infinito "Dual-Track" com icones SVG e Devicon
- [x] Testimonials Section: Depoimentos reais de clientes com avatar
- [x] UI Refinement: Reorganizacao de secoes para fluxo de navegacao perfeito
- [x] Otimizacao: Refatoracao do scroll para eliminar jumps

### v1.2.0 - Credenciais e Mini-CMS
- [x] LinkedIn-Style Credentials: Lista clicavel de certificacoes com hover interativo
- [x] Photo-Ready Avatars: Estrutura de avatar com fallback para iniciais
- [x] Contact CTA Improvement: Titulo mais persuasivo
- [x] JSON Data Layer: `data/content.json` como base para CMS simplificado

### v1.3.0 - Internacionalizacao e Widgets
- [x] i18n (EN/PT): Toggle de idioma com traducoes completas via `translations.json`
- [x] Blog & Stats Section: Placeholder para artigos tecnicos
- [x] GitHub Activity Widget: Estatisticas via GitHub Readme Stats
- [x] WakaTime Integration: Widget de tempo de codigo
- [x] Download CV: Botao para download por idioma
- [x] Education Card Expanded: Semestre, previsao e areas de foco

### v1.4.0 - Refinamento e i18n Robusto
- [x] Universal i18n: Sistema com `data-i18n` para deteccao automatica
- [x] Credential Layout Fix: Alinhamento dos cards de certificacao
- [x] Full Translation Coverage: 100% das secoes traduzidas
- [x] Blog Hidden: Secao temporariamente oculta

### v1.5.0 - Refinamento de Conteudo e Foco em Carreira
- [x] Hero Text Profissional: Descricao reescrita para refletir experiencia real
- [x] Formulario de Contato Reformulado: Foco em vagas de programacao
- [x] Opcao de Mentoria Removida: Ajustado para perfil em inicio de carreira
- [x] Bug Fixes: Typo `??`, hero badge com i18n, link GitHub unificado
- [x] Documentacao: Arquivo `contexto.md` para contextualizar futuras edicoes

---

## Proximas Versoes

### v1.6.0 - Melhorias Tecnicas e Qualidade
- [ ] Subresource Integrity (SRI) para scripts e styles de CDN (parcial: Devicon com SHA-384)
- [x] Skip-to-content link para acessibilidade
- [x] Fix: dimensoes da imagem de perfil (width/height vs aspect-ratio)
- [x] Fix: path do SVG no servico 1 (icone malformado)
- [x] Fix: tags `<video>` vazias (remover ou popular)
- [x] Minificacao de CSS (71KB -> 47KB) e JS (45KB -> 19KB)
- [x] Deploy automatico GitHub -> Hostinger via GitHub Actions
- [x] Pasta `docs/` com documentacao organizada

### v1.7.0 - Blog Tecnico Funcional
- [x] Sistema de blog com artigos em Markdown
- [x] Conversor Markdown -> HTML estatico (build step)
- [x] Pagina de listagem de artigos
- [x] Pagina individual de artigo
- [x] RSS feed para o blog
- [x] SEO especifico por artigo (meta tags dinamicas)
- [x] Integracao com sitemap.xml

### v1.8.0 - Case Studies Dinamicos
- [ ] Migrar case studies de `main.js` para `data/projects.json`
- [ ] Galeria de imagens melhorada nos modais
- [ ] Videos de demonstracao nos projetos
- [ ] Metricas e resultados por projeto
- [ ] Links para repositorios e demos ao vivo

### v2.0.0 - PWA e Experiencia Offline
- [ ] Service Worker para cache offline
- [ ] Manifest.json para instalacao como app
- [ ] Notificacoes push (novos artigos do blog)
- [ ] Modo offline com conteudo cacheado
- [ ] Icones de app para iOS e Android

---

## Novos Projetos Planejados

### Landing Pages de Projetos
- [ ] AquaFlora AgroShop - Landing page dedicada (Prioridade alta)
- [ ] JoysticKnights - Portal de noticias gaming (Prioridade media)
- [ ] Kingdom of Aen - Pagina do jogo (Prioridade media)
- [ ] Florescer Garden - Loja agricultura online (Prioridade media)
- [ ] ComercioBes - Vitrine e vendas da cidade Boa Esperanca do Sul (Prioridade alta)

### Dashboard Admin
- [ ] Painel para gerenciar conteudo do portfolio
- [ ] Editor de certificacoes e depoimentos
- [ ] Preview ao vivo das alteracoes
- [ ] Integracao com GitHub API para deploy

### API Backend
- [ ] API Node.js/Express para servir conteudo
- [ ] Substituir FormSubmit.co por backend proprio
- [ ] Sistema de autenticacao para admin
- [ ] Database para artigos do blog

---

## Prioridades

1. **Imediato**: v1.6.0 (melhorias tecnicas + deploy automatico)
2. **Curto prazo**: v1.7.0 (blog tecnico)
3. **Medio prazo**: v1.8.0 (case studies) + Landing pages
4. **Longo prazo**: v2.0.0 (PWA) + Dashboard + API

---

## Plano de Execucao Inicial

> Inicio: 2026-04-10

### Sprint 0 - Planejamento Operacional (2 dias)
- [x] Consolidar backlog e prioridades do roadmap
- [ ] Criar issues no GitHub para cada item de `v1.6.0`
- [ ] Definir Definition of Done (DoD) para features e landing pages
- [ ] Estimar esforco dos itens (`S`, `M`, `L`)

### Sprint 1 - Hardening v1.6.0 (1 semana)
- [x] Acessibilidade: skip-to-content link e revisoes de foco
- [x] Correcao tecnica: imagem de perfil, SVG malformado e videos placeholder
- [ ] Seguranca: aplicar SRI em scripts/styles de CDN
- [x] Performance: minificar CSS/JS e validar tamanho dos artefatos
- [x] Operacao: pipeline GitHub Actions para deploy Hostinger

Entregavel: release `v1.6.0` com checklist tecnico concluido.

### Sprint 2 - Base do Blog v1.7.0 (1 semana)
- [x] Estruturar pasta `blog/` com template de artigo
- [x] Configurar build Markdown -> HTML estatico
- [x] Criar pagina de listagem e pagina individual
- [x] Gerar RSS inicial e integrar ao `sitemap.xml`

Entregavel: 1 artigo tecnico publicado com SEO completo.

### Sprint 3 - Landing Pages Prioritarias (2 semanas)
- [ ] Publicar landing page do AquaFlora AgroShop
- [ ] Publicar landing page do ComercioBes
- [ ] Padronizar template reutilizavel para os 3 projetos restantes
- [ ] Definir metricas de sucesso (CTR, tempo na pagina, contato)

Entregavel: base pronta para escalar as 5 landing pages planejadas.
