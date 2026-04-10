# Pedro Braga - Portfolio

> **Full Stack Developer & Infraestrutura** | E-commerce, Automações em Python e Servidores

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://pedrobragabes.com)
![Version](https://img.shields.io/badge/Version-v1.0%20RC-blue)
![License](https://img.shields.io/badge/License-MIT-green)

🌐 **Acesse online:** [pedrobragabes.com](https://pedrobragabes.com)

---

## Sobre o Projeto

Portfólio profissional desenvolvido com foco em **Performance**, **Acessibilidade (a11y)** e **SEO Técnico**.  
O projeto demonstra práticas modernas de desenvolvimento web ("Clean Code"), sem dependência de frameworks pesados, garantindo carregamento instantâneo.

---

## 🚀 Features & Destaques

### 🎨 Design & UX
- **Design Premium**: Interface moderna com tema claro/escuro (Dark Mode automático).
- **Glassmorphism**: Efeito de vidro no header, cards e elementos flutuantes.
- **Micro-interações**: Efeitos de hover, ripple em botões e transições suaves.
- **Responsivo**: Layout fluido que se adapta perfeitamente de celulares a monitores ultrawide.

### ⚡ Performance & Engine
- **Core Web Vitals**: Otimizado para LCP (Largest Contentful Paint) e CLS (Cumulative Layout Shift).
- **Throttling**: Gerenciamento inteligente de eventos de scroll para economizar CPU/Bateria.
- **Lazy Loading**: Imagens e recursos pesados carregam apenas quando necessários.
- **Recursos**: Uso de WebP (recomendado) e fontes otimizadas.

### 🔍 SEO & Técnico
- **SEO On-Page**: Metadados completos, Open Graph (WhatsApp/LinkedIn) e Twitter Cards.
- **Dados Estruturados**: JSON-LD implementado (`Schema.org/Person`) para Google Rich Results.
- **Arquivos de Bot**: `robots.txt` e `sitemap.xml` configurados para indexação correta.

### ♿ Acessibilidade
- **WCAG 2.1 AA**: Cores com contraste adequado e fontes legíveis.
- **Navegação por Teclado**: Outline visível e ordem de foco lógica.
- **Leitores de Tela**: Atributos ARIA (`aria-expanded`, `aria-label`, `aria-valuenow`) implementados corretamente.

---

## 🛠️ Stack Técnica

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | HTML5 Semântico, CSS3 (Variables, Flexbox/Grid), JavaScript (ES6+ Modular) |
| **Metodologia** | BEM (Block Element Modifier), Mobile-First |
| **Infraestrutura** | Static Site, SEO Técnico, Otimização de Assets |
| **Ferramentas** | VS Code, Git, Chrome DevTools (Lighthouse) |

---

## 📂 Estrutura de Arquivos

```
portfolio-pedro-braga/
├── index.html             # Markup semântico e acessível
├── robots.txt             # Diretrizes para crawlers
├── sitemap.xml            # Mapa do site para buscadores
├── css/
│   └── style.css          # Design System e estilos componentizados
│   └── blog.css           # Estilos da area de blog
├── blog/
│   ├── posts/             # Fonte dos artigos em Markdown
│   ├── index.html         # Listagem de artigos (gerada no build)
│   └── <slug>/index.html  # Pagina individual de artigo (gerada no build)
├── js/
│   ├── main.js            # Lógica de interface, scroll e tema
│   ├── content-loader.js  # Mini-CMS: carrega dados do JSON
│   └── i18n.js            # Sistema de internacionalização (EN/PT)
├── scripts/
│   └── build-blog.js      # Conversor Markdown -> HTML + RSS + Sitemap
├── data/
│   ├── content.json       # Mini-CMS: credenciais, depoimentos, contato
│   └── translations.json  # Traduções EN/PT para todo o site
├── assets/
│   ├── profile/           # Foto de perfil
│   ├── resume/            # CV em PDF
│   ├── testimonials/      # Fotos de depoimentos
│   └── icon/              # Favicon
└── README.md              # Documentação
```



---

## Documentacao

A documentacao completa esta organizada na pasta [`docs/`](docs/):

| Documento | Descricao |
|-----------|-----------|
| [DEPLOY.md](docs/DEPLOY.md) | Guia de deploy (Vercel, Hostinger, GitHub Actions) |
| [ROADMAP.md](docs/ROADMAP.md) | Historico de versoes e roadmap futuro |
| [SEGURANCA.md](docs/SEGURANCA.md) | Headers de seguranca, CSP, checklist |
| [CONTEXTO.md](docs/CONTEXTO.md) | Arquitetura, design system, padroes de codigo |
| [PLANOS.md](docs/PLANOS.md) | Novos projetos, melhorias e visao estrategica |

## Deploy Automatico

O projeto faz deploy automatico para **Vercel** (CDN) e **Hostinger** (FTP via GitHub Actions) a cada push na branch `main`. Veja detalhes em [docs/DEPLOY.md](docs/DEPLOY.md).

## Build de Performance (Minificacao)

Para regenerar os assets de producao:

- `npm run minify:css` gera `css/style.min.css`
- `npm run minify:js` gera `js/*.min.js`
- `npm run build:minify` executa os dois passos

Resultados atuais:

- CSS: `71KB -> 47KB`
- JS total: `45KB -> 19KB`

## Build do Blog (v1.7.0)

Para gerar as paginas do blog, feed RSS e atualizar o sitemap:

- `npm run build:blog`
- `npm run build` (blog + minificacao)

Pipeline do blog:

1. Lê arquivos Markdown em `blog/posts/*.md`
2. Converte para HTML estatico
3. Gera `blog/index.html` e `blog/<slug>/index.html`
4. Gera `blog/rss.xml`
5. Atualiza `sitemap.xml` com URLs do blog

---

## 📞 Contato

- **Website:** [pedrobragabes.com](https://pedrobragabes.com)
- **Email:** pedrobraga855@gmail.com
- **LinkedIn:** [/in/pedrobragabes](https://www.linkedin.com/in/pedrobragabes/)
- **GitHub:** [@pedrobragabes](https://github.com/pedrobragabes)

---

<p align="center">
  Desenvolvido com excelência por <strong>Pedro Braga</strong>
</p>
