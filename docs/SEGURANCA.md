# Seguranca - Portfolio Pedro Braga

> Ultima atualizacao: 2026-04-10

---

## 1. Headers de Seguranca

O portfolio implementa headers de seguranca tanto no **Vercel** (`vercel.json`) quanto no **Apache/Hostinger** (`.htaccess`).

### Headers Ativos

| Header | Valor | Protecao |
|--------|-------|----------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forca HTTPS por 2 anos |
| `X-Frame-Options` | `DENY` (Vercel) / `SAMEORIGIN` (Hostinger) | Previne clickjacking |
| `X-Content-Type-Options` | `nosniff` | Impede MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controla informacao de referencia |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | Bloqueia APIs desnecessarias |
| `X-XSS-Protection` | `1; mode=block` (apenas .htaccess) | Legado, para navegadores antigos |
| `Content-Security-Policy` | Veja detalhes abaixo | Controle granular de recursos |

### Content-Security-Policy (CSP) Detalhado

```
default-src 'self';
script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' https://cdn.jsdelivr.net;
font-src 'self' https://cdn.jsdelivr.net;
img-src 'self' data: https:;
connect-src 'self' https://formsubmit.co https://www.google-analytics.com https://www.googletagmanager.com;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self' https://formsubmit.co
```

**O que cada diretiva faz:**
- `default-src 'self'`: Bloqueia tudo que nao for do proprio dominio por padrao
- `script-src`: Permite scripts apenas do dominio + Google Analytics
- `style-src`: Permite estilos do dominio + Devicon CDN (jsdelivr)
- `font-src`: Permite fontes do dominio + CDN
- `img-src`: Permite imagens do dominio + data URIs + qualquer HTTPS
- `connect-src`: Permite conexoes para FormSubmit e Google Analytics
- `frame-src 'none'`: Nenhum iframe permitido
- `object-src 'none'`: Nenhum plugin (Flash, Java) permitido
- `form-action`: Formularios so podem enviar para o dominio ou FormSubmit

---

## 2. Protecao de Arquivos (.htaccess)

### Arquivos Bloqueados
Extensoes com acesso negado: `.htaccess`, `.htpasswd`, `.ini`, `.log`, `.sh`, `.sql`, `.bak`, `.config`, `.dist`, `.fla`, `.inc`, `.psd`, `.swp`, `.env`

### Arquivos Ocultos
Todos os arquivos comecando com `.` sao bloqueados, exceto `.well-known/` (necessario para verificacao SSL).

### Listagem de Diretorio
Desabilitada com `Options -Indexes` - visitantes nao podem ver o conteudo das pastas.

---

## 3. HTTPS e Criptografia

### Vercel
- SSL/TLS automatico via Let's Encrypt
- HTTP/2 habilitado por padrao
- Certificado renovado automaticamente

### Hostinger
- SSL gratuito via hPanel (Let's Encrypt)
- Redirect HTTP -> HTTPS via `.htaccess` (301 permanente)
- Redirect www -> non-www para consistencia

### HSTS Preload
O header HSTS com `preload` permite inclusao na lista de preload dos navegadores. Para submeter: https://hstspreload.org/

---

## 4. Seguranca no JavaScript

### Manipulacao Segura do DOM
- `content-loader.js` usa `textContent` em vez de `innerHTML`
- Elementos criados via `document.createElement()` (nunca string HTML)
- Sanitizacao de URLs com allowlist (`http`, `https`, `/`, `assets/`)

### Allowlists
- Logos de certificacao: apenas `alura` e `efset` (paths pre-definidos)
- URLs: apenas protocolos seguros e paths locais

### localStorage
- Armazena apenas preferencias (tema, idioma)
- Nenhum dado sensivel e armazenado no cliente

---

## 5. Servicos Externos

| Servico | Uso | Risco |
|---------|-----|-------|
| Google Analytics 4 | Tracking de visitantes | Baixo - dados anonimizados |
| FormSubmit.co | Envio de formulario | Baixo - POST sem dados sensiveis |
| jsdelivr CDN | Icones Devicon | Baixo - protegido com SRI SHA-384 |
| Google Tag Manager | Carregamento do GA | Baixo - script oficial Google |

---

## 6. Recomendacoes Pendentes

### Alta Prioridade

**Subresource Integrity (SRI)**
Status atual: **parcialmente implementado** (Devicon com SRI SHA-384). O script remoto do Google Tag Manager permanece sem SRI por ser um vendor script dinamico sujeito a mudancas frequentes.

Adicionar hashes de integridade para recursos de CDN:
```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      integrity="sha384-HASH_AQUI"
      crossorigin="anonymous">
```
Isso garante que se o CDN for comprometido, o navegador rejeita o recurso alterado.

**Como gerar o hash:**
```bash
curl -s https://cdn.jsdelivr.net/... | openssl dgst -sha384 -binary | openssl base64 -A
```

### Media Prioridade

**Focus Trap no Modal**
O modal de case study deve prender o foco (Tab) dentro dele enquanto aberto, impedindo que o usuario navegue para elementos atras do modal.

**aria-invalid no Formulario**
Campos invalidos devem ter `aria-invalid="true"` e `aria-describedby` apontando para a mensagem de erro.

### Baixa Prioridade

**Header X-Frame-Options**
Unificar entre Vercel (`DENY`) e Hostinger (`SAMEORIGIN`). Recomendado: usar `DENY` em ambos, ja que o site nao precisa ser embutido em iframes.

---

## 7. Checklist de Seguranca por Deploy

Antes de cada deploy, verifique:

- [ ] Nenhum arquivo `.env`, `.sql`, `.bak` ou credencial no repositorio
- [ ] `vercel.json` e `.htaccess` com headers de seguranca atualizados
- [ ] CSP atualizado se novos servicos externos foram adicionados
- [ ] Secrets do GitHub Actions configurados (nunca hardcoded)
- [ ] HTTPS funcionando corretamente
- [ ] Testar em https://securityheaders.com/ (nota A ou A+)
- [ ] Verificar console do navegador por erros de CSP

---

## 8. Resposta a Incidentes

### Se o site for comprometido
1. Desabilite o deploy automatico (pause no Vercel ou desative a Action)
2. Reverta para o ultimo commit seguro: `git revert` ou rollback na Vercel
3. Mude TODAS as senhas: FTP, GitHub, Hostinger, FormSubmit
4. Verifique o `.htaccess` por injecoes (redirects maliciosos)
5. Escaneie os arquivos por codigo malicioso
6. Reative o deploy apos confirmar que esta limpo

### Se credenciais vazarem
1. Revogue imediatamente os Secrets no GitHub
2. Mude a senha FTP na Hostinger
3. Verifique o historico de commits por dados sensiveis
4. Use `git filter-branch` ou BFG Repo-Cleaner para limpar o historico se necessario
