# Portfolio Pedro Braga

Portfólio profissional de Pedro Braga, Software Engineer com foco em backend, infraestrutura, automação e produtos web.

Produção: [pedrobragabes.com](https://pedrobragabes.com)

## Objetivo

Apresentar competências, experiência e projetos de forma rápida, acessível e convincente para recrutadores, pares e contato profissional. O produto é deliberadamente estático: não possui backend, banco, autenticação ou painel administrativo.

## Stack

- HTML semântico, CSS e JavaScript sem framework.
- Conteúdo complementar em JSON.
- Blog em Markdown gerado com Node.js.
- Minificação com Clean CSS e Terser.
- Hospedagem Hostinger com deploy via GitHub Actions.
- Formulário processado pelo FormSubmit.

## Desenvolvimento

Requisitos: Node.js 22 ou superior e npm.

```bash
npm ci
npm run build
```

`npm run build` gera o blog, minifica CSS/JavaScript e executa os smoke tests.

Comandos úteis:

```bash
npm test
npm run build:blog
npm run build:minify
npm audit
```

## Estrutura

```text
/.github/workflows   pipeline de build e deploy
/assets              imagens, fontes e currículos
/blog/posts          fontes Markdown dos artigos
/css                 estilos fonte e gerados
/data                conteúdo e traduções
/docs                auditorias e registros técnicos
/js                  scripts fonte e gerados
/scripts             geração do blog
/tests               verificações automatizadas
index.html            página principal
404.html              página de erro
```

Os arquivos estáticos permanecem na raiz por compatibilidade com a hospedagem atual. Uma futura separação `src/` → `public/` só deve ocorrer junto de preview e validação de deploy.

## Qualidade e segurança

- CSP, HSTS, proteção contra framing e `nosniff` configurados em `.htaccess` e `vercel.json`.
- Scripts inline executáveis evitados.
- Dependências verificadas por `npm audit`.
- Build reproduzível a partir da data mais recente dos posts ou `SOURCE_DATE_EPOCH`.
- Código legado e arquivos administrativos não fazem parte do repositório nem do deploy; cópias históricas locais são preservadas e ignoradas.

## Deploy

Pushes na branch `main` executam `.github/workflows/deploy-hostinger.yml`. O workflow instala dependências com `npm ci`, executa o build completo empacota apenas arquivos públicos e publica por FTP usando secrets do GitHub. A etapa final compara o commit e os hashes publicados com o build.

Consulte [DEPLOY.md](DEPLOY.md) para operação e rollback.

## Documentação

- [ARCHITECTURE.md](ARCHITECTURE.md)
- [CHANGELOG.md](CHANGELOG.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [DEPLOY.md](DEPLOY.md)
- [ROADMAP.md](ROADMAP.md)
- [SECURITY.md](SECURITY.md)
- [Posicionamento e escopo](docs/POSICIONAMENTO.md)
- [Política de cases](docs/CASES.md)
- [Auditoria de organização e sincronização](docs/AUDITORIA_2026-09-05.md)
- [Auditoria técnica histórica](docs/AUDITORIA_TECNICA.md)

## Licença

[MIT](LICENSE)
