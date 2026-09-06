# Orientação do repositório

Leia README e ROADMAP.md, DEPLOY.md e docs/POSICIONAMENTO.md antes de alterar o escopo.

- Verifique git status; preserve mudanças locais anteriores e use worktree quando necessário.
- Atualize as issues existentes antes de criar duplicatas. O estado atual do GitHub prevalece sobre checklists históricos.
- Currículo e repos de outros produtos exigem escopo próprio; não os atualize como manutenção incidental.
- Não invente produção, métricas, clientes, depoimentos ou datas comprometidas.
- Preserve HTML estático, PT/EN por slug e arquivos minificados reproduzíveis. Rode npm run build, npm run package:deploy e git diff --check. Deploy só da main; nunca copie a raiz inteira para FTP.
- Faça mudanças pequenas. Não apague arquivos históricos locais nem mescle PRs de dependências com base apenas em checks antigos.
