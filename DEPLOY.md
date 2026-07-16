# Deploy

## Produção

- URL: `https://pedrobragabes.com`
- Hospedagem: Hostinger
- Origem: branch `main`
- Pipeline: `.github/workflows/deploy-hostinger.yml`

## Secrets necessários

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

## Processo automático

1. Checkout do commit em `main`.
2. Node.js 20 e `npm ci`.
3. `npm run build`, incluindo smoke tests.
4. Upload para `/public_html/` por FTP.

Arquivos de desenvolvimento, documentação, fontes Markdown e dependências não são enviados.

## Verificação pós-deploy

```bash
curl -I https://pedrobragabes.com/
curl -I https://pedrobragabes.com/404.html
curl -I https://pedrobragabes.com/archive/
curl -I https://pedrobragabes.com/css/style.min.css
```

Esperado: home `200`, 404 renderizável, archive `403` ou `404`, headers de segurança presentes e CSS/JS com cache curto.

Também validar:

- página principal e blog em desktop/mobile;
- tema e tradução;
- abertura/fechamento dos cases por teclado;
- formulário sem efetuar envio de teste não autorizado;
- sitemap e RSS.

## Rollback

Reverta o commit problemático em `main` com um novo commit. O push resultante executará o mesmo pipeline e republicará o estado anterior. Não reescreva o histórico da branch principal.

Se o FTP mantiver arquivos removidos, exclua-os no gerenciador de arquivos da Hostinger. O prefixo `/archive/` permanece bloqueado pelo `.htaccess` como defesa adicional.
