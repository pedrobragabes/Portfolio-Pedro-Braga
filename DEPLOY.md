# Guia de Deploy - pedrobragabes.com

Este guia descreve os passos para colocar seu portfólio no ar usando seu domínio personalizado.

## 1. Preparação dos Arquivos

Antes de subir, garanta que suas imagens estão otimizadas:
1.  **Imagem de Perfil**: Converta `assets/Pedro Braga.png` para **WebP** (sugerido: `Pedro Braga.webp`).
    *   *Nota: Se mudar a extensão, atualize a tag `<img>` no `index.html` e a tag `og:image`.*
2.  **Tamanho**: Tente manter as imagens abaixo de 100KB.

## 2. Opções de Hospedagem

Como seu site é **Estático** (apenas HTML, CSS, JS), você tem opções gratuitas e de alta performance.

### Opção A: Vercel (Recomendada pela Velocidade/CDN)
1.  Crie uma conta na [Vercel](https://vercel.com).
2.  Importe seu repositório do GitHub (`portfolio-pedro-braga`).
3.  Nas configurações do projeto na Vercel, vá em **Settings > Domains**.
4.  Adicione `pedrobragabes.com`.
5.  A Vercel vai te dar os **Nameservers** ou registros **A/CNAME** para colocar onde você comprou o domínio.

### Opção B: GitHub Pages (Simples)
1.  No repositório do GitHub, vá em **Settings > Pages**.
2.  Em "Source", selecione a branch `main`.
3.  Em "Custom domain", digite `pedrobragabes.com` e salve.
4.  O GitHub vai pedir para criar um arquivo `CNAME` na raiz (ele cria automático).
5.  Vá no seu registrador de domínio e aponte os DNS para o GitHub.

### Opção C: Hospedagem Tradicional (cPanel/Hostinger/Locaweb)
1.  Acesse o Gerenciador de Arquivos ou FTP (FileZilla).
2.  Entre na pasta `public_html` (ou equivalente).
3.  Faça o upload de **todos** os arquivos da pasta do projeto (`index.html`, pasta `css`, pasta `js`, pasta `assets`, `robots.txt`, `sitemap.xml`).
4.  **Não** suba a pasta `.git` ou `node_modules`.

## 3. Pós-Deploy (Checklist)

Após o site estar no ar e o domínio propagado:
- [ ] Acesse `https://pedrobragabes.com` e teste o carregamento.
- [ ] Verifique se o "cadeado" (HTTPS/SSL) está ativo.
- [ ] Teste o formulário de contato.
- [ ] Copie o link e mande no WhatsApp para ver se a **foto e descrição** aparecem (Open Graph).

## Suporte

Se precisar de ajuda com a configuração de DNS, consulte a documentação do local onde você comprou o domínio.
