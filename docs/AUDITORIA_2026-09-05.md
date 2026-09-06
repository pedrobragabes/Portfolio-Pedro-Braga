# Auditoria e organização — 2026-09-05

## Repositório e cópias

- Site: Portfolio-Pedro-Braga, branch main.
- pedrobragabes é um repositório separado de perfil; não foi alterado.
- Checkout original estava sincronizado no commit e17c090.
- Havia archive/, default.php e cinco documentos históricos não versionados em docs/. Foram preservados no PC e ignorados para evitar publicação acidental.
- Trabalho realizado em worktree separado; nenhuma alteração local anterior foi apagada.
- PR #1 já existia com manutenção e atualização de ComércioBES; sua revisão continua na issue #11.

## Limpeza implementada

Florescer retirado da vitrine e dos dados de modal, placeholders esvaziados, formação sem porcentagem, cargo e maturidade corrigidos em PT/EN, área de consultoria reduzida, GitHub/LinkedIn visíveis. Traduções dos projetos usam slug para evitar troca após remoção de cards.

Build empacotado em dist/, CI em PR e verificação pós-deploy adicionados. js-yaml atualizado para corrigir o alerta encontrado pelo npm audit.

## Limites

Screenshots atuais ainda dependem de curadoria; currículo e autorização de depoimento aguardam o fluxo específico. Formulário e referências históricas restantes estão no roadmap, sem promessa de redesign completo nesta revisão.

## Documentos canônicos

README → entrada; ROADMAP → prioridades e issues; DEPLOY → operação; ARCHITECTURE → arquitetura; docs/POSICIONAMENTO → escopo; docs/CASES → evidências. Documentos locais antigos não são fontes atuais.
