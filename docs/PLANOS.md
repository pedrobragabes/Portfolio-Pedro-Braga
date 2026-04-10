# Planos e Novos Projetos

> Ultima atualizacao: 2026-04-10

---

## Visao Estrategica

O portfolio `pedrobragabes.com` funciona como **hub central** que conecta todos os projetos e presenca online. A estrategia e expandir gradualmente com novos sites, projetos e ferramentas que demonstrem habilidades tecnicas reais.

---

## 1. Melhorias no Portfolio Atual

### Performance
- [ ] Minificar CSS (69KB -> ~40KB) e JS (56KB -> ~30KB)
- [ ] Implementar critical CSS inline no `<head>`
- [ ] Adicionar `<picture>` com `srcset` para imagens responsivas
- [ ] Considerar lazy loading nativo para imagens abaixo do fold

### Acessibilidade
- [ ] Adicionar skip-to-content link
- [ ] Implementar focus trap no modal de case study
- [ ] Melhorar `aria-invalid` e `aria-describedby` no formulario
- [ ] Revisar alt text de todas as imagens

### SEO
- [ ] Expandir schema.org (adicionar `LocalBusiness` ou `ProfessionalService`)
- [ ] Criar paginas individuais para projetos (melhor indexacao)
- [ ] Implementar breadcrumbs estruturados
- [ ] Adicionar mais structured data para certificacoes

### Seguranca
- [ ] Implementar SRI (Subresource Integrity) para CDNs
- [ ] Unificar X-Frame-Options entre Vercel e Hostinger
- [ ] Adicionar `Report-To` header para monitorar violacoes de CSP

---

## 2. Blog Tecnico

**Objetivo:** Demonstrar conhecimento tecnico com artigos originais.

### Arquitetura Planejada
```
blog/
├── index.html          # Lista de artigos
├── posts/
│   ├── meu-homelab.html
│   ├── deploy-automatico.html
│   └── ...
├── css/
│   └── blog.css        # Estilos especificos do blog
└── data/
    └── posts.json      # Metadados dos artigos
```

### Features
- Artigos escritos em Markdown, convertidos para HTML
- Listagem com filtros por categoria e tag
- Tempo estimado de leitura
- Compartilhamento em redes sociais
- RSS feed (`/blog/feed.xml`)
- Syntax highlighting para blocos de codigo
- SEO individual por artigo (meta tags, Open Graph)

### Temas para Primeiros Artigos
1. "Como montei meu Home Lab do zero"
2. "Deploy automatico com GitHub Actions e FTP"
3. "Criando um portfolio com Vanilla JS: por que sem frameworks?"
4. "Seguranca em sites estaticos: CSP, HSTS e headers"

---

## 3. Landing Pages de Projetos

**Objetivo:** Transformar cada projeto em case comercial com foco em conversao e prova tecnica.

### Ordem de Execucao
1. AquaFlora AgroShop (prioridade alta)
2. ComercioBes (prioridade alta)
3. JoysticKnights (prioridade media)
4. Kingdom of Aen (prioridade media)
5. Florescer Garden (prioridade media)

### Template Base (reutilizavel)
- [ ] Hero com proposta de valor + CTA principal
- [ ] Bloco "Problema -> Solucao -> Resultado"
- [ ] Stack tecnica com icones e responsabilidades
- [ ] Galeria de telas (desktop e mobile)
- [ ] Secao de metricas (Lighthouse e/ou impacto de negocio)
- [ ] CTA final para demo, repositorio ou contato

### AquaFlora AgroShop
- [ ] Definir narrativa: desafio do cliente, solucao implementada e ganhos
- [ ] Selecionar 4-6 screenshots (home, catalogo, checkout, painel)
- [ ] Documentar stack e integracoes principais
- [ ] Inserir depoimento do cliente com autorizacao
- [ ] Publicar em `/projects/aquaflora/` com SEO dedicado

### ComercioBes
- [ ] Definir proposta local: vitrine digital da cidade
- [ ] Mapear jornadas (comerciante, visitante e contato)
- [ ] Preparar galeria com destaque mobile-first
- [ ] Registrar impacto esperado (alcance local e leads)
- [ ] Publicar em `/projects/comerciobes/` com schema de projeto

### JoysticKnights
- [ ] Definir pilares editoriais (noticias, reviews, guias)
- [ ] Mostrar fluxo de publicacao por categoria
- [ ] Incluir exemplos de cards, pagina de noticia e busca
- [ ] Publicar em `/projects/joysticknights/` com foco em UX de leitura

### Kingdom of Aen
- [ ] Documentar conceito do jogo e publico-alvo
- [ ] Exibir artes, gameplay e pipeline de producao
- [ ] Detalhar ferramentas e stack de desenvolvimento
- [ ] Publicar em `/projects/kingdom-of-aen/` com midia otimizada

### Florescer Garden
- [ ] Definir posicionamento da loja online de agricultura
- [ ] Estruturar vitrine de produtos e jornada de compra
- [ ] Destacar diferenciais (catalogo, atendimento e confianca)
- [ ] Publicar em `/projects/florescer-garden/` com foco em conversao

### Definition of Done (Landing Pages)
- [ ] Lighthouse >= 90 em Performance, SEO e Accessibility
- [ ] Responsivo validado (360px, 768px, 1024px, 1440px)
- [ ] Meta tags Open Graph, description e canonical configuradas
- [ ] Imagens em formato moderno com dimensoes declaradas
- [ ] CTA e links de demo/repositorio funcionando

---

## 4. Dashboard Admin (Futuro)

**Objetivo:** Interface para gerenciar conteudo do portfolio sem editar JSON manualmente.

### Features Planejadas
- Login seguro (JWT ou session-based)
- CRUD de certificacoes
- CRUD de depoimentos
- Editor de textos do portfolio
- Preview ao vivo das alteracoes
- Deploy trigger (botao para publicar via GitHub API)
- Historico de alteracoes

### Stack Sugerida
- **Frontend:** React ou Vue.js (SPA)
- **Backend:** Node.js + Express
- **Database:** SQLite ou PostgreSQL
- **Auth:** JWT + bcrypt
- **Deploy:** Vercel (frontend) + Railway/Render (backend)

---

## 5. API Backend (Futuro)

**Objetivo:** Substituir servicos terceiros e ter controle total dos dados.

### Endpoints Planejados
```
GET  /api/projects       # Lista projetos
GET  /api/projects/:id   # Detalhes do projeto
GET  /api/blog/posts     # Lista artigos
GET  /api/blog/posts/:id # Artigo completo
POST /api/contact        # Envio de formulario (substituir FormSubmit)
GET  /api/stats           # Estatisticas do portfolio
```

### Stack Sugerida
- **Runtime:** Node.js ou Python (FastAPI)
- **Database:** PostgreSQL
- **ORM:** Prisma ou SQLAlchemy
- **Deploy:** Railway, Render ou VPS

---

## 6. Outros Projetos em Consideracao

### CLI Tools
- [ ] Ferramenta CLI para gerar portfolios a partir de template
- [ ] Script de setup automatizado para novos projetos

### Automacoes
- [ ] Bot de Telegram/Discord para notificacoes do portfolio
- [ ] Script Python para backup automatico dos dados
- [ ] Monitoramento de uptime com alertas

### Open Source
- [ ] Template do portfolio no GitHub (com documentacao)
- [ ] Contribuicoes para projetos open source relevantes

---

## Prioridades e Timeline

| Prioridade | Projeto | Status |
|-----------|---------|--------|
| 1 | Melhorias tecnicas (v1.6) | Em planejamento |
| 2 | Deploy automatico GitHub -> Hostinger | Em implementacao |
| 3 | Blog tecnico (v1.7) | Planejado |
| 4 | Landing pages de projetos | Planejado |
| 5 | Case studies dinamicos (v1.8) | Planejado |
| 6 | PWA (v2.0) | Futuro |
| 7 | Dashboard Admin | Futuro |
| 8 | API Backend | Futuro |

---

## Decisoes Arquiteturais

### Por que Vanilla JS?
- Performance maxima (sem overhead de framework)
- Controle total do DOM e comportamento
- Ideal para site estatico de uma pagina
- Demonstra conhecimento fundamental de JS

### Por que site estatico?
- CDN-friendly (Vercel distribui globalmente)
- Carregamento instantaneo
- SEO perfeito (todo conteudo no HTML)
- Custo zero de servidor

### Quando migrar para framework?
- Quando o blog tiver muitas paginas (considerar SSG como Astro ou 11ty)
- Quando o dashboard admin for implementado (React/Vue)
- Quando a complexidade da UI justificar (multiplas rotas, estado complexo)

### Por que JSON para conteudo?
- Facil de editar sem mexer no HTML
- Pronto para migrar para API/CMS no futuro
- Fallback gracioso (HTML base funciona sem JSON)
