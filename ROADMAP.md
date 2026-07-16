# Roadmap

O roadmap prioriza manutenção. Nenhuma feature nova deve anteceder os itens de qualidade.

## v1.8.1 — Hardening

- [x] Remover legado administrativo/backend.
- [x] Corrigir dependências vulneráveis.
- [x] Corrigir 404, CSP, cache e build reproduzível.
- [x] Adicionar smoke tests.
- [ ] Confirmar deploy e remoção remota de `/archive/`.

## v1.9.0 — Manutenção

- [ ] Dividir `main.js` por responsabilidade sem framework.
- [ ] Consolidar regras duplicadas de `style.css`.
- [ ] Adicionar validação de HTML, links e acessibilidade no CI.
- [ ] Adicionar preview de deploy para mudanças de interface.
- [ ] Implementar nomes de assets com hash e cache imutável.

## Fora de escopo

- Backend próprio.
- Banco de dados.
- Autenticação ou painel administrativo.
- CMS customizado.
- Novos widgets de atividade.

Esses itens só podem voltar ao roadmap com necessidade demonstrada e ADR aprovado.
