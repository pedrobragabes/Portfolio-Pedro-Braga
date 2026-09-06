# Deploy na Hostinger

Produção: https://pedrobragabes.com. Repositório: [Portfolio-Pedro-Braga](https://github.com/pedrobragabes/Portfolio-Pedro-Braga).

## O que é automático

Push na `main` dispara `.github/workflows/deploy-hostinger.yml`. Push em branch de trabalho não publica. Abrir uma PR executa o workflow Quality; integrar a PR na main publica. Edições no PC só chegam à hospedagem depois de commit e push. O workflow manual também exige main.

## Pipeline

1. Node.js 22, npm ci e build (blog, minificação e smoke tests).
2. npm run package:deploy recria somente dist/ com uma lista explícita de arquivos públicos.
3. Publicação FTP de dist/ em /public_html/ com FTP_SERVER, FTP_USERNAME e FTP_PASSWORD.
4. npm run verify:deploy consulta deployment.json e compara o SHA do commit e hashes de HTML, CSS, JS e dados com o build.

Docs, scripts, tests, dependências, arquivos locais históricos e credenciais não entram no pacote. A pasta dist/ não é versionada. A ação FTP mantém o protocolo existente; alteração para FTPS/SFTP exige verificar suporte no provedor.

A publicação não é atômica: uma falha durante o upload pode deixar arquivos de versões diferentes. A verificação final detecta divergência nos arquivos principais e falha o workflow. O lock de concorrência serializa deploys sem interromper um upload ativo.

## Operação

- Conferir [Actions](https://github.com/pedrobragabes/Portfolio-Pedro-Braga/actions/workflows/deploy-hostinger.yml) no commit desejado.
- Não tratar falha do Dependabot como falha de hospedagem.
- Em falha de verificação, conferir cache/CDN e repetir o workflow na main; não registrar senha em logs.
- Conferir home, blog, links principais, 404 e bloqueios /archive/, /backend/ e default.php.
- Os secrets foram encontrados no GitHub; seus valores não foram lidos ou alterados.

## Rollback

Reverter o commit problemático por um novo commit na main e acompanhar o novo deploy. Não forçar histórico. O upload pode remover arquivos anteriormente gerenciados pelo estado da ação; arquivos históricos anteriores a esse estado podem exigir limpeza específica no provedor. Não apagar toda a raiz da hospedagem.

## Evidência da auditoria

Em 2026-09-05, o checkout local original e origin/main estavam em e17c09093306966233dca4ea4f0f0ebad13e6c26. Os três últimos workflows de deploy estavam concluídos com sucesso; o mais recente era [29504128519](https://github.com/pedrobragabes/Portfolio-Pedro-Braga/actions/runs/29504128519). O site público ainda continha a narrativa anterior. A nova execução ficará ligada à [issue #3](https://github.com/pedrobragabes/Portfolio-Pedro-Braga/issues/3).
