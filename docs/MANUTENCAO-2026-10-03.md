# Reconciliação da manutenção

Escopo: [issue #11](https://github.com/pedrobragabes/Portfolio-Pedro-Braga/issues/11).
Base: `57aceb6f80211a060d59ccfc4b0173f6ddf9e60f`.

A PR #1 foi comparada com a main vigente. Quality e gitleaks já estão na base;
os arquivos de HTML, JavaScript e lockfile daquela PR pertencem à curadoria
anterior e não devem substituir os cases, retrato ou currículos atuais.
O item aplicável restante é a política de atualizações semanais, agora definida
para npm e GitHub Actions, com limite de cinco PRs por ecossistema.

O Quality passa a auditar todas as dependências com limiar alto antes de gerar o
site e seu pacote público. O workflow de gitleaks existente continua obrigatório.
Cada atualização precisa de checks atuais, build reproduzível e revisão do diff.

Branch/PR não publica na Hostinger. Integrar na main dispara o deploy existente;
a evidência desse deploy deve ser registrada antes de declarar mudança publicada.
Os gates de domínio/canais comerciais, autorização dos cases e revisão visual
continuam nas respectivas issues.
