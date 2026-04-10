---
title: "Deploy automático com GitHub Actions e Hostinger (FTP)"
description: "Como publicar site estático automaticamente na Hostinger usando GitHub Actions com segurança e rollback simples."
date: "2026-04-10"
updated: "2026-04-10"
tags:
  - DevOps
  - GitHub Actions
  - Deploy
cover: "https://pedrobragabes.com/assets/profile/Pedro Braga.webp"
---

Automatizar deploy foi uma das melhorias com maior impacto no meu fluxo.

Com GitHub Actions, cada push na `main` já envia a versão nova para produção.

## 1. Secrets necessários

No repositório GitHub:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

Nunca deixe esses dados no código.

## 2. Workflow essencial

O pipeline faz:

1. checkout do repositório
2. conexão via action de FTP
3. upload para `public_html/`

Com exclusões para arquivos internos como `.git`, `docs` e markdown de documentação.

## 3. Boas práticas de segurança

- habilitar branch protection na `main`
- revisar PR antes de merge
- manter histórico de deploys para rollback

## 4. Testes pós-deploy

Checklist mínimo:

- homepage carregando com HTTPS
- links principais funcionando
- formulário de contato respondendo
- sitemap acessível

## Conclusão

Deploy automático reduz erro manual, acelera entrega e deixa o projeto mais profissional.

No próximo artigo posso detalhar como combinar esse fluxo com validação de qualidade antes do upload.
