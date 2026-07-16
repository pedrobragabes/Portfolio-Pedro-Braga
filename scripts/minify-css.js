const fs = require('node:fs');
const path = require('node:path');
const CleanCSS = require('clean-css');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'css', 'style.css');
const outputPath = path.join(root, 'css', 'style.min.css');
const source = fs.readFileSync(sourcePath, 'utf8');
const result = new CleanCSS({ level: 2 }).minify(source);

if (result.errors.length > 0) {
    throw new Error(`Falha ao minificar CSS: ${result.errors.join('; ')}`);
}

result.warnings.forEach((warning) => console.warn(`CSS: ${warning}`));
fs.writeFileSync(outputPath, result.styles, 'utf8');
