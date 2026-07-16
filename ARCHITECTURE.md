# Arquitetura

## Contexto

Este projeto é um portfólio público. Seus requisitos principais são disponibilidade, carregamento rápido, acessibilidade, SEO e manutenção simples. A arquitetura escolhida é um site estático sem backend próprio.

## Componentes

1. `index.html`: página principal e fallback de conteúdo.
2. `css/style.css`: estilos da página principal; `style.min.css` é o artefato publicado.
3. `js/main.js`: comportamento da interface; arquivos `.min.js` são artefatos publicados.
4. `data/content.json`: credenciais, depoimento e informações atualizáveis.
5. `data/translations.json`: traduções PT/EN.
6. `blog/posts/*.md`: fontes do blog.
7. `scripts/build-blog.js`: gera páginas, RSS e sitemap.
8. `tests/`: contratos mínimos de integridade do site e deploy.

## Fluxo de build

```text
Markdown + HTML/CSS/JS fonte
          ↓
scripts/build-blog.js + minificadores
          ↓
HTML do blog + RSS + sitemap + assets minificados
          ↓
smoke tests
          ↓
deploy FTP
```

## Decisões

- Sem framework: o tamanho e a interatividade não justificam runtime ou bundler de aplicação.
- Sem API/banco/admin: não existe requisito que compense custo operacional e superfície de ataque.
- Conteúdo com fallback HTML: falha de JSON não pode deixar a página vazia.
- Dependências mínimas e apenas para build.
- Arquivos gerados versionados por compatibilidade com a hospedagem; o CI verifica que são regeneráveis.

## Limites

`index.html`, `style.css` e `main.js` ainda são grandes. A modularização deve preservar a saída estática e acontecer em mudanças pequenas, com testes de regressão. Não migrar para framework apenas por organização.
