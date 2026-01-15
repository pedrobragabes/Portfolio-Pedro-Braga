# Portfolio Pedro Braga - Documentação de Contexto

> Documento criado em: 2026-01-15
> Última atualização: 2026-01-15

## 📋 Visão Geral

Este é o portfólio profissional de **Pedro Braga**, desenvolvido como um **static site** com foco em **performance**, **acessibilidade (a11y)** e **SEO técnico**. O código segue práticas modernas de desenvolvimento web ("Clean Code") sem dependência de frameworks pesados.

**URL de produção:** [pedrobragabes.com](https://pedrobragabes.com)

---

## 🏗️ Arquitetura do Projeto

```
portfolio-pedro-braga/
├── index.html              # Página principal (HTML semântico)
├── 404.html                # Página de erro personalizada
├── robots.txt              # Diretrizes para crawlers
├── sitemap.xml             # Mapa do site para buscadores
├── default.php             # Fallback PHP (servidor)
├── css/
│   └── style.css           # Design System completo (~3000 linhas)
├── js/
│   ├── main.js             # Lógica principal (UI, scroll, modais, tema)
│   ├── content-loader.js   # Mini-CMS: carrega dados do JSON
│   └── i18n.js             # Sistema de internacionalização (EN/PT)
├── data/
│   ├── content.json        # Dados dinâmicos (certificações, depoimentos, contato)
│   └── translations.json   # Traduções completas EN/PT
└── assets/
    ├── AquaFlora/          # Imagens do projeto AquaFlora
    ├── favicon/            # Favicons
    ├── icons/              # Logos de certificações (Alura, EFSET, UNIVESP)
    ├── profile/            # Foto de perfil
    ├── resume/             # CVs em PDF (PT e EN)
    └── testimonials/       # Fotos de clientes
```

---

## 🔧 Tecnologias Utilizadas

| Categoria       | Tecnologia                                         |
|-----------------|---------------------------------------------------|
| **Markup**      | HTML5 Semântico                                   |
| **Estilos**     | CSS3 (Custom Properties, Flexbox, Grid)           |
| **JavaScript**  | ES6+ (Vanilla, sem frameworks)                    |
| **Metodologia** | BEM (Block Element Modifier), Mobile-First        |
| **Fontes**      | Google Fonts (Inter, Playfair Display)            |
| **Ícones**      | Devicon, SVGs customizados                        |
| **Analytics**   | Google Analytics (gtag.js)                        |
| **Forms**       | FormSubmit.co                                     |

---

## 📁 Arquivos Principais e Suas Funções

### `js/main.js`
Contém toda a lógica de interface:
- **Header scroll behavior**: Adiciona classe `.scrolled` ao rolar
- **Theme toggle**: Dark/Light mode com persistência em `localStorage`
- **Mobile navigation**: Menu hamburguer responsivo
- **Scroll reveal animations**: IntersectionObserver para animações
- **Active nav highlighting**: Destaca link ativo no menu
- **Smooth scrolling**: Navegação suave por âncoras
- **Case Study Modal**: Modal com dados dos projetos
- **Lightbox**: Zoom em imagens da galeria
- **Contact form handling**: Validação e envio assíncrono
- **Animated counters**: Animação de números na seção de stats
- **Parallax effects**: Efeito parallax na hero section

### `js/i18n.js`
Sistema de internacionalização:
- Suporta **Português (PT)** e **Inglês (EN)**
- Tradução via atributo `data-i18n` ou seletores CSS específicos
- Persistência de idioma em `localStorage`
- Atualiza `lang` do HTML e link do CV dinamicamente

### `js/content-loader.js`
Mini-CMS que carrega dados do JSON:
- Certificações → `#credentialsList`
- Depoimentos → `.testimonials__grid`
- Contato → Títulos e subtítulos
- Educação → Progress bar, semestre, disciplinas

### `data/content.json`
Dados estruturados:
- `certifications[]`: Certificações com status, instituição, URL
- `testimonials[]`: Depoimentos com foto, nome, cargo
- `contact{}`: Email, WhatsApp, mensagem configurável
- `education{}`: Semestre atual, previsão, disciplinas

### `data/translations.json`
Todas as traduções organizadas por seção (nav, hero, about, etc.)

---

## 🐛 Bugs e Issues Identificados

### 🔴 Críticos
*Nenhum bug crítico identificado*

### ✅ Corrigidos (2026-01-15)

1. **Typo no título do Contact Section** - Removido `??` duplicado
2. **Link de GitHub inconsistente** - Unificado para `pedrobragabes`
3. **Hero badge sem i18n** - Adicionado `data-i18n="hero.badge"`
4. **Formulário muito "sênior"** - Ajustado para perfil com foco em oportunidades de emprego
5. **Opção de Mentoria removida** - Não adequada ao nível de experiência atual
6. **Textos com promessas impossíveis** - Reescritas descrições da hero para serem profissionais e realistas

### 🟢 Menores (Pendentes)

4. **Imagem de perfil com dimensões iguais** (`index.html:170`)
   - `width="320" height="320"` indica quadrado
   - Mas o wrapper tem `aspect-ratio: 3/4` (retângulo)
   - Pode causar confusão ou CLS

5. **Foto de testemunho não sendo exibida** (`content.json:51`)
   - O path contém espaço: `Diego Crente.jpg`
   - O `content-loader.js` deveria carregar automaticamente, mas o fallback mostra inicial "D"
   - Verificar se o arquivo existe e se o path está correto

6. **SVG path incorreto no serviço 1** (`index.html:240-241`)
   - O path do SVG está duplicado/errado gerando forma estranha
   ```html
   <!-- Path duplicado com valores incorretos -->
   d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1 4-10z"
   ```

7. **Comentários HTML malformados no Blog section** (`index.html:857, 882, 907`)
   - Usa `<!- -` com espaço, que é válido mas inconsistente

8. **Video sem source em alguns project cards** (`index.html:443, 492, 539`)
   - Tags `<video>` vazias sem `<source>` - intencional mas pode causar warning

---

## 🔄 Fluxo de Dados

```
┌─────────────────┐     fetch      ┌──────────────────┐
│ content.json    │ ──────────────►│ content-loader.js│
│ translations.json│               │ i18n.js          │
└─────────────────┘                └────────┬─────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │   DOM Updates    │
                                   │ - Credentials    │
                                   │ - Testimonials   │
                                   │ - Education      │
                                   │ - All text (i18n)│
                                   └──────────────────┘
```

---

## 🎨 Design System (CSS Custom Properties)

```css
/* Cores principais (Light Mode) */
--bg-warm: #D4C4B0;
--bg-cream: #F5F0E8;
--text-dark: #1A1A1A;
--text-medium: #3D3D3D;
--accent-brown: #8B7355;

/* Cores principais (Dark Mode) */
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

/* Motion */
--transition-fast: 0.2s ease;
--transition-medium: 0.4s ease;
```

---

## 📝 Padrões de Código

### HTML
- Classe BEM: `.block__element--modifier`
- Atributos ARIA para acessibilidade
- `data-i18n` para textos traduzíveis
- SVGs inline para controle de cor via CSS

### CSS
- Mobile-first (breakpoints: 480px, 600px, 768px, 900px, 1024px)
- Variáveis CSS para temas e consistência
- Animações com `@keyframes` e `transition`
- Dark mode via `[data-theme="dark"]`

### JavaScript
- IIFE (Immediately Invoked Function Expression) para encapsulamento
- `'use strict'` para modo estrito
- Event listeners com throttle para performance
- IntersectionObserver para lazy effects
- Async/await para fetch de dados

---

## 🚀 Deploy e SEO

### Meta Tags Essenciais
- Open Graph (og:title, og:description, og:image)
- Twitter Cards
- Canonical URL
- JSON-LD (Schema.org/Person)

### Arquivos de Bot
- `robots.txt`: Permite todos os crawlers
- `sitemap.xml`: Lista páginas do site

### Analytics
- Google Analytics 4 (G-C7M61DXD7W)

---

## 🔜 Roadmap (do README)

### Implementado ✅
- Skills Marquee (carrossel infinito)
- Testimonials Section
- i18n (EN/PT) com toggle
- Download CV com versão por idioma
- Credentials com logos
- Case Study Modal com galeria

### Futuro 📅
- [ ] Blog técnico funcional (artigos em Markdown)
- [ ] Case Study Modals dinâmicos via API

---

## 📌 Notas para Manutenção

1. **Adicionar nova certificação**: Editar `data/content.json` → `certifications[]`

2. **Adicionar novo depoimento**: Editar `data/content.json` → `testimonials[]`
   - Colocar foto em `assets/testimonials/`

3. **Adicionar tradução**: Editar `data/translations.json` em ambas as chaves `pt` e `en`

4. **Alterar semestre/disciplinas**: Editar `data/content.json` → `education{}`

5. **Adicionar novo projeto**: 
   - Adicionar carta no `index.html` (seção `#projects`)
   - Adicionar case study no objeto `caseStudies` em `main.js`

6. **Alterar cores do tema**: Modificar custom properties em `css/style.css` (`:root` e `[data-theme="dark"]`)

---

## 🧪 Testes Recomendados

- **Lighthouse**: Performance, Accessibility, SEO, Best Practices
- **Wave**: Verificação de acessibilidade
- **Mobile-Friendly Test**: Responsividade
- **Validar**: W3C HTML Validator
- **Links**: Broken Link Checker

---

> **Autor do documento**: Análise assistida por IA
> **Versão do projeto**: v1.5.0 (Refinamento de Conteúdo e Foco em Carreira)
