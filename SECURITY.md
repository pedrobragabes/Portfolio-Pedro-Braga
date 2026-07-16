# Segurança

## Escopo

O runtime é estático. Não existem API própria, autenticação, cookies de sessão, banco ou upload.

## Controles

- CSP restritiva e scripts executáveis externos.
- HSTS, `X-Content-Type-Options`, proteção contra framing e política de referência.
- Form action e conexões limitadas aos destinos necessários.
- Dependências verificadas no build.
- `/archive/` bloqueado mesmo não existindo no artefato.
- Secrets de FTP armazenados apenas no GitHub Actions.

## Dados e terceiros

O formulário usa FormSubmit e transmite os dados preenchidos pelo visitante para esse operador. Google Analytics é carregado para métricas do site. Mudanças nesses serviços exigem revisão de CSP e privacidade.

## Relato de vulnerabilidade

Não abra issue pública com detalhes exploráveis. Envie o relato para `pedrobraga855@gmail.com` com impacto, reprodução e evidências mínimas. Não inclua secrets ou dados pessoais desnecessários.

## Checklist de release

- `npm run build`
- `npm audit`
- `git diff --check`
- confirmar headers de produção;
- confirmar que `/archive/` não está acessível;
- confirmar ausência de secrets e bancos no Git.
