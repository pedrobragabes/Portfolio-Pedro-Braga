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
- [x] Hero com proposta de valor + CTA principal
- [x] Bloco "Problema -> Solucao -> Resultado"
- [x] Stack tecnica com icones e responsabilidades
- [x] Galeria de telas (desktop e mobile)
- [x] Secao de metricas (Lighthouse e/ou impacto de negocio)
- [x] CTA final para demo, repositorio ou contato

### AquaFlora AgroShop
- [x] Definir narrativa: desafio do cliente, solucao implementada e ganhos
- [ ] Selecionar 4-6 screenshots (home, catalogo, checkout, painel)
- [x] Documentar stack e integracoes principais
- [x] Inserir depoimento do cliente com autorizacao
- [x] Publicar em `/projects/aquaflora/` com SEO dedicado

### ComercioBes
- [x] Definir proposta local: vitrine digital da cidade
- [x] Mapear jornadas (comerciante, visitante e contato)
- [x] Preparar galeria com destaque mobile-first
- [x] Registrar impacto esperado (alcance local e leads)
- [x] Publicar em `/projects/comerciobes/` com schema de projeto

### JoysticKnights
- [ ] Definir pilares editoriais (noticias, reviews, guias)
- [ ] Mostrar fluxo de publicacao por categoria
- [ ] Incluir exemplos de cards, pagina de noticia e busca
- [x] Publicar em `/projects/joysticknights/` com foco em UX de leitura

### Kingdom of Aen
- [ ] Documentar conceito do jogo e publico-alvo
- [ ] Exibir artes, gameplay e pipeline de producao
- [ ] Detalhar ferramentas e stack de desenvolvimento
- [x] Publicar em `/projects/kingdom-of-aen/` com midia otimizada

### Florescer Garden
- [ ] Definir posicionamento da loja online de agricultura
- [ ] Estruturar vitrine de produtos e jornada de compra
- [ ] Destacar diferenciais (catalogo, atendimento e confianca)
- [x] Publicar em `/projects/florescer-garden/` com foco em conversao

### Definition of Done (Landing Pages)
- [ ] Lighthouse >= 90 em Performance, SEO e Accessibility
- [ ] Responsivo validado (360px, 768px, 1024px, 1440px)
- [ ] Meta tags Open Graph, description e canonical configuradas
- [ ] Imagens em formato moderno com dimensoes declaradas
- [ ] CTA e links de demo/repositorio funcionando

---

## 4. Dashboard Admin (MVP Concluido)

**Objetivo:** Interface para gerenciar conteudo do portfolio sem editar JSON manualmente.

### Features Entregues no MVP
- [x] Painel em `admin/index.html`
- [x] CRUD de certificacoes
- [x] CRUD de depoimentos
- [x] Preview ao vivo das alteracoes
- [x] Publicacao de `data/content.json` via GitHub API
- [x] Trigger manual de deploy via workflow_dispatch

### Backlog Pos-MVP
- [ ] Login seguro (JWT ou session-based)
- [ ] Editor de textos do portfolio (contact/education)
- [ ] Historico de alteracoes

### Stack Definida no MVP
- **Frontend:** HTML + CSS + JavaScript (Vanilla)
- **Backend:** Sem backend dedicado (GitHub REST API direto no painel)
- **Auth:** Token GitHub manual (escopo `repo` + `workflow`)
- **Persistencia:** Arquivo `data/content.json` no repositorio
- **Deploy:** GitHub Actions (`deploy-hostinger.yml`) com `workflow_dispatch`

---

## 5. API Backend (Foundation v0 Concluida)

**Objetivo:** Substituir servicos terceiros e ter controle total dos dados.

### Endpoints Entregues
```
GET  /api/projects       # Lista projetos
GET  /api/projects/:id   # Detalhes do projeto
GET  /api/blog/posts      # Lista artigos
GET  /api/blog/posts/:id  # Artigo completo
POST /api/contact         # Envio de formulario (com validacao, honeypot e rate-limit)
```

### Stack Definida na Foundation
- **Runtime:** Node.js + Express
- **Seguranca:** helmet + CORS restrito + express-rate-limit + validacao Zod
- **Persistencia inicial:** repositorios baseados em arquivos (`data/projects.json`, `blog/posts/*.md`, `backend/storage/*.jsonl`)
- **Deploy previsto para API dedicada:** Railway, Render ou VPS

### Backlog Pos-Foundation
- [ ] Autenticacao para rotas administrativas
- [ ] Migracao de persistencia de posts para banco de dados
- [ ] Endpoint de estatisticas consolidado (`/api/stats`)
- [ ] Unificar deploy de API e frontend em ambiente de producao

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
| 6 | PWA (v2.0) | Opcional / Pausado |
| 7 | Dashboard Admin | MVP concluido |
| 8 | API Backend | Foundation v0 concluida |

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
