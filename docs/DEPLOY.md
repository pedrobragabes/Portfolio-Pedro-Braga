# Guia de Deploy - pedrobragabes.com

> Ultima atualizacao: 2026-04-10

## Visao Geral

O portfolio e um site estatico (HTML, CSS, JS) com duas opcoes de hospedagem ativas:
- **Vercel** (CDN global, deploy automatico via GitHub)
- **Hostinger** (hospedagem tradicional, deploy automatico via GitHub Actions + FTP)

Foundation de API backend disponivel em `backend/` para execucao dedicada (Node.js/Express).

---

## 1. Preparacao dos Arquivos

Antes de subir, garanta que:
1. Imagens estao otimizadas (WebP, < 100KB cada)
2. `sitemap.xml` esta atualizado com a data correta em `<lastmod>`
3. `data/content.json` e `data/translations.json` estao corretos
4. Teste local: abra `index.html` no navegador e verifique todas as secoes

---

## 2. Deploy Automatico (GitHub -> Hostinger)

O deploy para Hostinger e feito automaticamente via **GitHub Actions** a cada push na branch `main`.
Tambem e possivel disparar deploy manual pelo Dashboard Admin (`/admin/`) via `workflow_dispatch`.

### Como funciona

```
Push na main -> GitHub Actions -> FTP Upload -> Hostinger (public_html/)

ou

Dashboard Admin -> GitHub API (`workflow_dispatch`) -> GitHub Actions -> FTP Upload -> Hostinger
```

### Configuracao dos Secrets no GitHub

Va em **Settings > Secrets and variables > Actions** no repositorio e adicione:

| Secret | Descricao | Exemplo |
|--------|-----------|---------|
| `FTP_SERVER` | Endereco do servidor FTP da Hostinger | `ftp.pedrobragabes.com` ou IP |
| `FTP_USERNAME` | Usuario FTP (encontre no hPanel da Hostinger) | `u123456789` |
| `FTP_PASSWORD` | Senha do FTP | `sua-senha-segura` |

### Onde encontrar as credenciais FTP na Hostinger

1. Acesse o [hPanel da Hostinger](https://hpanel.hostinger.com)
2. Va em **Arquivos > Contas FTP**
3. Copie o **Host**, **Usuario** e defina uma **Senha**
4. Adicione como Secrets no GitHub (nunca no codigo!)

### Arquivos excluidos do deploy

O workflow exclui automaticamente:
- `.git/`, `.github/`, `docs/`
- `*.md` (README, LICENSE, etc.)
- `contexto.md`, `DEPLOY.md`
- `.gitignore`

### Workflow

O arquivo `.github/workflows/deploy-hostinger.yml` contem toda a configuracao. Para verificar o status dos deploys, va em **Actions** no repositorio GitHub.

### Deploy manual pelo Dashboard Admin

1. Acesse `/admin/`
2. Preencha `owner`, `repositorio`, `branch` e `workflow`
3. Informe um token GitHub com escopo `repo` + `workflow`
4. Clique em `Disparar deploy` (ou `Publicar + Deploy`)

Observacao: o token e usado apenas na sessao do navegador e nao e salvo.

---

## 3. Deploy via Vercel (CDN)

### Setup Inicial
1. Crie uma conta na [Vercel](https://vercel.com)
2. Importe o repositorio do GitHub
3. Va em **Settings > Domains** e adicione `pedrobragabes.com`
4. Configure os DNS conforme instrucoes da Vercel

### Deploy Automatico
- Cada push na `main` faz deploy automatico
- Preview deploys em branches de feature
- Configuracao em `vercel.json` (headers, cache, seguranca)

### Rollback
- Na dashboard da Vercel, va em **Deployments**
- Clique nos 3 pontos do deploy anterior e selecione **Promote to Production**

---

## 4. Deploy via GitHub Pages (Alternativa)

1. No repositorio: **Settings > Pages**
2. Source: branch `main`, pasta `/` (root)
3. Custom domain: `pedrobragabes.com`
4. Aguarde o arquivo `CNAME` ser criado automaticamente
5. Configure DNS no registrador do dominio

---

## 5. Deploy Manual via FTP (Hostinger)

Caso precise fazer deploy manual:

1. Acesse o **Gerenciador de Arquivos** no hPanel ou use **FileZilla**
2. Conecte com as credenciais FTP
3. Navegue ate `public_html/`
4. Faca upload de todos os arquivos **exceto**: `.git/`, `docs/`, `*.md`, `.github/`
5. Verifique se o `.htaccess` foi enviado (pode estar oculto)

---

## 6. Configuracao de DNS

### Para Vercel
```
Tipo    Nome    Valor
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### Para Hostinger
Use os nameservers fornecidos pela Hostinger:
```
ns1.dns-parking.com
ns2.dns-parking.com
```

### Para GitHub Pages
```
Tipo    Nome    Valor
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     pedrobragabes.github.io
```

---

## 7. Checklist Pos-Deploy

- [ ] Acessar `https://pedrobragabes.com` e verificar carregamento
- [ ] Confirmar cadeado HTTPS/SSL ativo
- [ ] Testar formulario de contato (`/api/contact` quando disponivel, com fallback FormSubmit)
- [ ] Testar toggle de tema (dark/light)
- [ ] Testar toggle de idioma (PT/EN)
- [ ] Enviar link no WhatsApp para testar Open Graph
- [ ] Verificar no [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Verificar no [Security Headers](https://securityheaders.com/)
- [ ] Confirmar que GitHub Actions rodou com sucesso (aba Actions)

---

## 8. Troubleshooting

### Deploy Hostinger falha no GitHub Actions
- Verifique se os Secrets estao corretos (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- Confirme que a conta FTP tem permissao de escrita em `public_html/`
- Verifique os logs na aba **Actions** do GitHub

### Site nao atualiza apos deploy
- Limpe o cache do navegador (Ctrl+Shift+R)
- Aguarde propagacao de DNS (ate 48h para mudancas de nameserver)
- Na Hostinger: limpe o cache no hPanel se disponivel

### HTTPS nao funciona
- Vercel: SSL e automatico, aguarde alguns minutos
- Hostinger: Ative o SSL em **Seguranca > SSL** no hPanel
- Verifique se o `.htaccess` tem o redirect HTTP -> HTTPS ativo

### Formulario nao envia
- Se houver backend ativo, verifique se `POST /api/contact` responde `201` ou `202`
- Verifique se o fallback para FormSubmit continua permitido no CSP (`connect-src` e `form-action`)
- Teste no console do navegador por erros de CORS na API e no fallback

---

## 9. API Backend Foundation (Local)

### Rodando localmente
1. Instale as dependencias no root do projeto: `npm install`
2. Suba a API: `npm run api:dev`
3. Endpoint de health: `http://localhost:8787/api/health`

### Endpoints da Foundation
- `POST /api/contact`
- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/blog/posts`
- `GET /api/blog/posts/:id`
