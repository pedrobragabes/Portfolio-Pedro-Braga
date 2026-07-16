# Contribuição

## Princípios

- Preserve o site estático e mantenha poucas dependências.
- Prefira código simples a novas abstrações.
- Não adicione backend, autenticação, banco ou CMS sem ADR e requisito medido.
- Não publique métricas sem evidência verificável.
- Mantenha conteúdo funcional sem JavaScript sempre que possível.

## Fluxo

1. Crie uma branch curta.
2. Faça mudanças pequenas e focadas.
3. Execute `npm ci` e `npm run build`.
4. Verifique `npm audit` e `git diff --check`.
5. Use commits semânticos, por exemplo `fix: correct project links`.
6. Abra PR com motivação, impacto e validações.

## Definition of Done

- Build e testes aprovados.
- Nenhum link ou asset local quebrado.
- Navegação por teclado preservada.
- Conteúdo PT/EN consistente.
- Arquivos fonte e minificados sincronizados.
- Documentação atualizada quando comportamento ou operação mudar.
