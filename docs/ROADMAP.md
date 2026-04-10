# Roadmap - Portfolio Pedro Braga

> Ultima atualizacao: 2026-04-10
> Escopo removido do fluxo ativo (admin/backend/case pages) arquivado em `archive/future-continuation-2026-04-10/`

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
- [x] Migrar case studies de `main.js` para `data/projects.json`
- [x] Galeria de imagens melhorada nos modais
- [x] Videos de demonstracao nos projetos
- [x] Metricas e resultados por projeto
- [x] Links para repositorios e demos ao vivo

### v2.0.0 - PWA e Experiencia Offline (Opcional / Pausado)
- [ ] (Opcional) Service Worker para cache offline
- [ ] (Opcional) Manifest.json para instalacao como app
- [ ] (Opcional) Notificacoes push (novos artigos do blog)
- [ ] (Opcional) Modo offline com conteudo cacheado
- [ ] (Opcional) Icones de app para iOS e Android
- [ ] Decisao de retomada apenas se houver demanda real de app instalavel

---

## Novos Projetos Planejados //????? API login e admin?

### Landing Pages de Projetos
- [x] AquaFlora AgroShop - Landing page dedicada (Prioridade alta)
- [x] JoysticKnights - Portal de noticias gaming (Prioridade media)
- [x] Kingdom of Aen - Pagina do jogo (Prioridade media)
- [x] Florescer Garden - Loja agricultura online (Prioridade media)
- [x] ComercioBes - Vitrine e vendas da cidade Boa Esperanca do Sul (Prioridade alta)

### Dashboard Admin
- [x] Painel para gerenciar conteudo do portfolio
- [x] Editor de certificacoes e depoimentos
- [x] Preview ao vivo das alteracoes
- [x] Integracao com GitHub API para deploy

### API Backend
- [x] API Node.js/Express para servir conteudo
- [x] Endpoint proprio para formulario de contato (`/api/contact`) com fallback controlado
- [ ] Sistema de autenticacao para admin
- [ ] Database para artigos do blog

---

## Prioridades

1. **Imediato**: Landing pages prioritarias (AquaFlora + ComercioBes)
2. **Curto prazo**: Landing pages restantes + padrao reutilizavel + metricas
3. **Medio prazo**: Dashboard Admin (MVP de gestao de conteudo)
4. **Longo prazo**: API Backend (auth admin, banco de dados e consolidacao de servicos)

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
- [x] Publicar landing page do AquaFlora AgroShop
- [x] Publicar landing page do ComercioBes
- [x] Padronizar template reutilizavel para os 3 projetos restantes
- [x] Definir metricas de sucesso (CTR, tempo na pagina, contato)

Entregavel: base pronta para escalar as 5 landing pages planejadas.

### Sprint 4 - Dashboard Admin MVP (2 semanas)
- [x] Definir stack do painel (frontend, backend e auth)
- [x] Implementar CRUD inicial de certificacoes e depoimentos
- [x] Criar preview ao vivo das alteracoes
- [x] Integrar disparo de deploy via GitHub API

Entregavel: painel funcional para manutencao de conteudo sem editar JSON manualmente. (Concluido em 2026-04-10)

### Sprint 5 - API Backend Foundation (2 semanas)
- [x] Estruturar API Node.js/Express com arquitetura base
- [x] Implementar endpoint seguro para formulario de contato
- [x] Criar endpoints de leitura para projetos e posts
- [x] Preparar camada de persistencia para artigos do blog

Entregavel: base de backend pronta para evoluir para um portfolio orientado a API. (Concluido em 2026-04-10, foundation v0)
