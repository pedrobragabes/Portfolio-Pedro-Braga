const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
// Only this fixed build directory is recreated. Local archives never enter it.
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output);
const publicEntries = ['index.html', '404.html', '.htaccess', 'robots.txt', 'sitemap.xml', 'assets', 'css', 'js', 'data', 'blog'];
for (const entry of publicEntries) {
    fs.cpSync(path.join(root, entry), path.join(output, entry), {
        recursive: true,
        filter: (source) => !source.endsWith('.md') && !source.includes(`${path.sep}blog${path.sep}posts`) && !source.includes(`${path.sep}FlorescerGarden`)
    });
}
const files = {};
for (const file of ['index.html', 'css/style.min.css', 'js/main.min.js', 'js/i18n.min.js', 'data/translations.json', 'data/content.json', 'assets/profile/pedro-braga-2026.png']) {
    files[file] = crypto.createHash('sha256').update(fs.readFileSync(path.join(output, file))).digest('hex');
}
const revision = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('Invalid deployment revision');
fs.writeFileSync(path.join(output, 'deployment.json'), JSON.stringify({ revision, files }, null, 2) + '\n');
for (const forbidden of ['docs', 'archive', 'backend', 'default.php', 'tests', 'scripts', 'package.json', '.env', '.git']) {
    if (fs.existsSync(path.join(output, forbidden))) throw new Error(`Private entry in deploy: ${forbidden}`);
}
console.log(`Deployment package ready: ${revision}`);
