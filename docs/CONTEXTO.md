# Contexto do Projeto - Portfolio Pedro Braga

> Documento criado em: 2026-01-15
> Ultima atualizacao: 2026-04-10

---

## Visao Geral

Portfolio profissional de **Pedro Braga**, desenvolvido como um **static site** com foco em **performance**, **acessibilidade (a11y)** e **SEO tecnico**. Codigo segue praticas modernas sem dependencia de frameworks.

**URL de producao:** [pedrobragabes.com](https://pedrobragabes.com)
**Versao atual:** v1.5.0

---

## Arquitetura do Projeto

```
portfolio-pedro-braga/
├── index.html              # Pagina principal (HTML semantico, 75KB)
├── 404.html                # Pagina de erro personalizada
├── default.php             # Fallback PHP para hospedagem legacy
├── robots.txt              # Diretrizes para crawlers
├── sitemap.xml             # Mapa do site para buscadores
├── .htaccess               # Seguranca e cache (Apache/Hostinger)
├── vercel.json             # Deploy e headers (Vercel)
├── css/
│   └── style.css           # Design System completo (~2000 linhas, 69KB)
├── js/
│   ├── main.js             # Logica principal: UI, scroll, modais, tema (23KB)
│   ├── content-loader.js   # Mini-CMS: carrega dados do JSON (11KB)
│   ├── i18n.js             # Internacionalizacao EN/PT (11KB)
│   ├── analytics.js        # Google Analytics 4 (150B)
│   └── year.js             # Ano dinamico e progress bars (445B)
├── data/
│   ├── content.json        # Dados dinamicos: certificacoes, depoimentos, contato
│   └── translations.json   # Traducoes completas EN/PT (19KB)
├── assets/
│   ├── AquaFlora/          # Imagens do projeto AquaFlora (3 WebP)
│   ├── favicon/            # Favicon (PNG)
│   ├── fonts/              # Inter + Playfair Display (4 WOFF2)
│   ├── icons/              # Logos: Alura, EFSET, UNIVESP
│   ├── profile/            # Foto de perfil (WebP)
│   ├── resume/             # CVs em PDF (PT e EN)
│   └── testimonials/       # Fotos de clientes
└── docs/                   # Documentacao do projeto
    ├── DEPLOY.md           # Guia de deploy
    ├── ROADMAP.md          # Roadmap e versoes
    ├── SEGURANCA.md        # Seguranca e headers
    ├── CONTEXTO.md         # Este arquivo
    └── PLANOS.md           # Planos futuros e novos projetos
```

---

## Stack Tecnica

| Categoria | Tecnologia |
|-----------|-----------|
| **Markup** | HTML5 Semantico + ARIA |
| **Estilos** | CSS3 (Custom Properties, Flexbox, Grid, clamp()) |
| **JavaScript** | ES6+ Vanilla (sem frameworks) |
| **Metodologia** | BEM + Mobile-First |
| **Fontes** | Inter (body) + Playfair Display (headings) - Self-hosted WOFF2 |
| **Icones** | Devicon CDN + SVGs customizados |
| **Analytics** | Google Analytics 4 (G-C7M61DXD7W) |
| **Formulario** | FormSubmit.co (POST handler) |
| **Deploy** | Vercel (CDN) + Hostinger (FTP via GitHub Actions) |
| **Versionamento** | Git/GitHub |

---

## Arquivos Principais

### js/main.js
Logica de interface completa:
- Header scroll behavior (`.scrolled` a 50px)
- Theme toggle (dark/light com localStorage)
- Parallax effects (hero section)
- Mobile navigation (hamburger com aria-expanded)
- Scroll reveal animations (IntersectionObserver, 15% threshold)
- Active nav highlighting
- Smooth scrolling (ancora com behavior: smooth)
- Scroll progress indicator
- Button ripple effects (Material Design)
- Contact form handling (validacao + FormSubmit POST)
- Animated counters (requestAnimationFrame)
- Case study modal (objeto `caseStudies` com 4 projetos)

### js/i18n.js
- Suporta PT (padrao) e EN
- Persistencia em localStorage (`portfolio-language`)
- Traducao via `data-i18n`, seletores CSS e atributos `data-words`
- Atualiza link do CV e atributo `lang` do HTML

### js/content-loader.js
Mini-CMS que popula conteudo de `data/content.json`:
- Certificacoes com logo allowlist e status badges
- Depoimentos com fallback para iniciais
- Dados de educacao (semestre, progress bar)
- Sanitizacao de texto (textContent, nao innerHTML)
- Sanitizacao de URLs (allowlist de protocolos)

---

## Design System (CSS Custom Properties)

```css
/* Light Mode */
--bg-warm: #D4C4B0;
--bg-cream: #F5F0E8;
--text-dark: #1A1A1A;
--text-medium: #3D3D3D;
--accent-brown: #8B7355;

/* Dark Mode */
--bg-warm: #1E1E1E;
--bg-cream: #121212;
--text-dark: #F5F0E8;
--accent-brown: #Eebb77;

/* Tipografia */
--font-body: 'Inter', sans-serif;
--font-heading: 'Playfair Display', serif;

/* Spacing */
--section-padding: clamp(80px, 12vh, 140px);
--container-max: 1100px;

/* Breakpoints: 480px, 600px, 768px, 900px, 1024px */
```

---

## Padroes de Codigo

### HTML
- Classes BEM: `.block__element--modifier`
- Atributos ARIA para acessibilidade
- `data-i18n` para textos traduziveis
- SVGs inline para controle de cor via CSS

### CSS
- Mobile-first com breakpoints progressivos
- Variaveis CSS para temas e consistencia
- Animacoes com `@keyframes` e `transition`
- Dark mode via `[data-theme="dark"]`
- Tipografia fluida com `clamp()`

### JavaScript
- IIFE para encapsulamento
- `'use strict'` para modo estrito
- Event listeners com throttle (100ms)
- IntersectionObserver para lazy effects
- Async/await para fetch de dados
- Passive event listeners para performance

---

## Fluxo de Dados

```
┌─────────────────┐     fetch      ┌──────────────────┐
│ content.json    │ ──────────────>│ content-loader.js │
│ translations.json│               │ i18n.js           │
└─────────────────┘                └────────┬──────────┘
                                            │
                                            v
                                   ┌──────────────────┐
                                   │   DOM Updates    │
                                   │ - Credentials    │
                                   │ - Testimonials   │
                                   │ - Education      │
                                   │ - All text (i18n)│
                                   └──────────────────┘
```

---

## Bugs Conhecidos

### Corrigidos (v1.5.0)
1. Typo no titulo do Contact Section (`??` duplicado)
2. Link de GitHub inconsistente (unificado para `pedrobragabes`)
3. Hero badge sem i18n (adicionado `data-i18n="hero.badge"`)
4. Formulario muito "senior" (ajustado para oportunidades)
5. Opcao de Mentoria removida
6. Textos com promessas impossiveis reescritos

### Pendentes (Menores)
1. **Imagem de perfil** (`index.html:170`): `width="320" height="320"` (quadrado) vs CSS `aspect-ratio: 3/4` (retangulo) - pode causar CLS
2. **Foto de testemunho** (`content.json:51`): Path com espaco (`Diego Crente.jpg`) - fallback para inicial "D" funciona
3. **SVG malformado** (`index.html:240-241`): Path duplicado no icone do servico 1
4. **Tags video vazias** (`index.html:443, 492, 539`): `<video>` sem `<source>` - placeholder intencional
5. **Comentarios HTML** (`index.html:857, 882, 907`): `<!- -` com espaco - valido mas inconsistente

---

## Notas de Manutencao

| Tarefa | Onde editar |
|--------|------------|
| Adicionar certificacao | `data/content.json` -> `certifications[]` |
| Adicionar depoimento | `data/content.json` -> `testimonials[]` + foto em `assets/testimonials/` |
| Adicionar traducao | `data/translations.json` (chaves `pt` e `en`) |
| Alterar semestre | `data/content.json` -> `education{}` |
| Adicionar projeto | `index.html` (secao `#projects`) + objeto `caseStudies` em `main.js` |
| Alterar cores do tema | `css/style.css` (`:root` e `[data-theme="dark"]`) |

---

## Testes Recomendados

- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) - Performance, Accessibility, SEO
- [Wave](https://wave.webaim.org/) - Acessibilidade
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Responsividade
- [W3C Validator](https://validator.w3.org/) - HTML valido
- [Security Headers](https://securityheaders.com/) - Headers de seguranca
