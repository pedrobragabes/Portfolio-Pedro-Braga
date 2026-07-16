const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function resolveLocalReference(htmlFile, reference) {
    const cleanReference = decodeURIComponent(reference.split('#')[0].split('?')[0]);
    if (!cleanReference) return null;

    const relativePath = cleanReference.startsWith('/')
        ? cleanReference.slice(1)
        : path.join(path.dirname(htmlFile), cleanReference);

    const candidate = path.join(root, relativePath);
    if (cleanReference.endsWith('/') || cleanReference === '/') {
        return path.join(candidate, 'index.html');
    }

    return candidate;
}

function assertLocalReferencesExist(htmlFile) {
    const html = read(htmlFile);
    const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);

    references.forEach((reference) => {
        if (/^(?:https?:|mailto:|tel:|data:|#)/.test(reference)) return;
        const target = resolveLocalReference(htmlFile, reference);
        assert.equal(fs.existsSync(target), true, `${htmlFile}: referência ausente ${reference}`);
    });
}

const indexHtml = read('index.html');
const notFoundHtml = read('404.html');
const htaccess = read('.htaccess');
const workflow = read('.github/workflows/deploy-hostinger.yml');
const i18nSource = read('js/i18n.js');
const mainSource = read('js/main.js');
const packageJson = JSON.parse(read('package.json'));
const vercelConfig = JSON.parse(read('vercel.json'));
JSON.parse(read('data/content.json'));
const translations = JSON.parse(read('data/translations.json'));

assert.match(indexHtml, /<script src="js\/theme-bootstrap\.min\.js"><\/script>/);
assert.doesNotMatch(indexHtml, /<!-- Apply theme[^]*?<script>[^]*?localStorage\.getItem\('theme'\)/);
assert.doesNotMatch(indexHtml, /href="#"|src=""|github-readme-stats|wakatime/i);
assert.doesNotMatch(indexHtml, /<article class="project-card[^"]*"[^>]*tabindex=/);
assert.match(indexHtml, /id="lightbox" role="dialog" aria-modal="true" aria-hidden="true"/);
assert.match(i18nSource, /\[data-i18n-aria-label\]/);
assert.match(mainSource, /const caseStudyTranslations =/);
assert.equal(translations.en.project_modal.context, 'Context');
assert.equal(typeof translations.en.projects.description_6, 'string');

assert.match(notFoundHtml, /href="\/assets\/favicon\/PB\.png"/);
assert.match(notFoundHtml, /href="\/css\/style\.min\.css"/);
assert.doesNotMatch(notFoundHtml, /js\/main(?:\.min)?\.js/);

assert.match(htaccess, /RewriteRule \^archive\(\?:\/\|\$\) - \[F,L,NC\]/);
assert.match(workflow, /\*\*\/archive\/\*\*/);
assert.equal(fs.existsSync(path.join(root, '.vercelignore')), true);
assert.equal(fs.existsSync(path.join(root, 'archive')), false);
assert.equal(fs.existsSync(path.join(root, 'default.php')), false);

assert.equal(packageJson.license, 'MIT');
assert.equal(Array.isArray(vercelConfig.headers), true);
assert.equal(fs.existsSync(path.join(root, 'js/theme-bootstrap.min.js')), true);

[
    'index.html',
    '404.html',
    'blog/index.html',
    'blog/deploy-automatico-github-actions-hostinger/index.html',
    'blog/homelab-proxmox-guia-pratico/index.html'
].forEach(assertLocalReferencesExist);

console.log('Smoke tests passed.');
