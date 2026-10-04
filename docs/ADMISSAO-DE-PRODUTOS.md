# Entrada de produtos no portfólio

Revisão: 04/10/2026. Critérios da [issue #8](https://github.com/pedrobragabes/Portfolio-Pedro-Braga/issues/8), aplicados à seleção pública atual. O portfólio preserva a implementação estática; a admissão é uma decisão editorial baseada em evidências.

## Porta de entrada para um destaque

Um produto entra como case selecionado quando possui:

1. Uma demonstração reproduzível do fluxo principal, com versão/commit e data. Link protegido deve informar a limitação; não funciona como prova de acesso público.
2. Um papel de Pedro e um recorte de implementação identificáveis, separando componentes que têm estados diferentes.
3. Uma descrição de estado e limitações consistente no HTML, conteúdo do modal e PT/EN. Build aprovado comprova build, não uso real.
4. Screenshots do fluxo demonstrado, com origem, data, alt text e revisão de dados sensíveis. Não publicar dados/ativos de clientes sem a autorização correspondente.
5. Resultado sustentado por evidência. Sem métrica medida, descrever o comportamento entregue e evitar números de tração, receita ou economia.

## Aplicação nesta revisão

| Projeto | Decisão atual | Evidência necessária para mudar |
| --- | --- | --- |
| CadastraFácil | Produto independente em desenvolvimento; permanece fora dos cases selecionados | Jornada foto/evidência → revisão humana por campo → draft em sandbox autorizada; confirmação de variantes pelo humano, recuperação de erros e isolamento demonstrados; screenshots revisados dessa jornada. Migrations/RLS aprovadas isoladamente não são esse MVP. |
| RastreIAGastos | Laboratório/side project; permanece fora da seleção profissional | Demonstração própria atual e evidências do recorte que se pretende apresentar. Não herdar maturidade do CadastraFácil novo a partir do monorepo antigo. |
| PromoGames | Fora da seleção até publicação demonstrável | Publicação da identidade e CMS próprios, URLs/canonical e fluxo editorial verificados, screenshots reais e data de validação. O WIP local não comprova publicação. |
| AquaFlora | Case profissional já selecionado, descrito por componente | Atualizar cada componente somente com suas evidências. WooCommerce/Stock Sync, apps internos, Agent e infraestrutura não herdam o estado uns dos outros. A conclusão editorial por componente continua na #5. |
| JoystickNights | Plataforma editorial selecionada | Separar operação atual e evolução headless; manter prova do fluxo publicado e ativos aprovados. |
| ComércioBES | Guia local selecionado, com limitações explícitas | Aceite do piloto e publicação acessível antes de narrar lançamento público concluído. BragaCommerce mantém seu próprio escopo transacional. |
| Kingdom of Aen / HomeLab | Histórico ou laboratório | Só ampliar destaque mediante demonstração relevante e evidências; sem remodelar o site para acomodar protótipos. |

## Evidência da aplicação

Em 04/10/2026, a seleção em `index.html` e os cases por slug em `js/main.js` não contêm cards de CadastraFácil, RastreIAGastos ou PromoGames. A matriz mantém essa decisão; não adiciona páginas, screenshots ou promessas de produto.

Menções antigas a softwares nos textos institucionais/traduções não constituem cases nem evidência de operação atual. A revisão do conteúdo institucional exige texto aplicável ao site e permanece separada da admissão; não usar essas menções para afirmar autenticação ou SaaS em produção.

Quando um gate for atendido, registrar a evidência usando [o template de case](templates/case.md), revisar PT/EN e então atualizar a seleção. A admissão do CadastraFácil depende do MVP, mas a definição e aplicação dos critérios da #8 estão concluídas sem bloquear trabalho no produto.
