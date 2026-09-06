# Changelog

As mudanças relevantes deste projeto seguem [Semantic Versioning](https://semver.org/).

## Não lançado — revisão 2026-09-05

- Corrigidos posicionamento pessoal, cargo, formação e maturidade dos projetos em PT/EN.
- Removidos Florescer da vitrine e placeholders do modal; links profissionais adicionados ao hero.
- Tradução por slug para suportar curadoria sem trocar descrições.
- Criados planejamento, issues, milestones, política de cases e templates de contribuição.
- Adicionados pacote público, CI em PR e verificação de commit/hashes após publicação na Hostinger.
- Atualizada a dependência transitiva js-yaml; documentos locais históricos preservados e ignorados.

## 1.8.1 — 2026-07-16

### Segurança

- Removido o legado de admin, backend e SQLite do repositório.
- Bloqueado o acesso a `/archive/`, `/backend/` e ao antigo `default.php`; o deploy também remove cópias remotas residuais.
- Atualizadas dependências; `npm audit` sem vulnerabilidades conhecidas.
- Extraído o bootstrap de tema para arquivo compatível com a CSP.

### Correções

- Corrigida a página 404, seu favicon e a exceção causada por `main.js`.
- Corrigida a concorrência entre conteúdo JSON e tradução.
- Concluída a localização PT/EN dos cards, cases e rótulos de acessibilidade.
- Ocultados controles sem destino e removidas promessas “em breve”.
- Melhorada a semântica dos cards e do lightbox.

### Manutenção

- Build tornado reproduzível.
- Adicionados smoke tests ao build.
- Actions atualizadas para runtimes Node.js 24 e fixadas por commit.
- Reduzido cache de CSS/JS sem fingerprint e normalizado o MIME de JavaScript na Hostinger.
- Removidos widgets, código comentado e métricas não verificáveis.
- Documentação consolidada para refletir a arquitetura real.
