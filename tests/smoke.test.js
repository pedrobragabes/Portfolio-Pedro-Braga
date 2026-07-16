const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const indexHtml = read('index.html');
const notFoundHtml = read('404.html');
const htaccess = read('.htaccess');
const workflow = read('.github/workflows/deploy-hostinger.yml');
const vercelConfig = JSON.parse(read('vercel.json'));

assert.match(indexHtml, /<script src="js\/theme-bootstrap\.min\.js"><\/script>/);
assert.doesNotMatch(indexHtml, /<!-- Apply theme[^]*?<script>[^]*?localStorage\.getItem\('theme'\)/);

assert.match(notFoundHtml, /href="\/assets\/favicon\/PB\.png"/);
assert.match(notFoundHtml, /href="\/css\/style\.min\.css"/);
assert.doesNotMatch(notFoundHtml, /js\/main(?:\.min)?\.js/);

assert.match(htaccess, /RewriteRule \^archive\(\?:\/\|\$\) - \[F,L,NC\]/);
assert.match(workflow, /\*\*\/archive\/\*\*/);
assert.equal(fs.existsSync(path.join(root, '.vercelignore')), true);

assert.equal(Array.isArray(vercelConfig.headers), true);
assert.equal(fs.existsSync(path.join(root, 'js/theme-bootstrap.min.js')), true);

console.log('Smoke tests passed.');
