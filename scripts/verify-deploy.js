const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const expected = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dist/deployment.json'), 'utf8'));
const base = new URL(process.env.DEPLOY_URL || 'https://pedrobragabes.com/');
if (base.protocol !== 'https:') throw new Error('Deployment verification requires HTTPS');
async function download(file) {
    const url = new URL(file, base);
    url.searchParams.set('verify', `${expected.revision}-${Date.now()}`);
    const response = await fetch(url, { signal: AbortSignal.timeout(15000), cache: 'no-store' });
    if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
}
async function verify() {
    const actual = JSON.parse((await download('deployment.json')).toString('utf8'));
    if (actual.revision !== expected.revision) throw new Error('Published revision differs from requested commit');
    for (const [file, hash] of Object.entries(expected.files)) {
        const received = crypto.createHash('sha256').update(await download(file)).digest('hex');
        if (received !== hash) throw new Error(`${file}: published content differs from build`);
    }
}
(async () => {
    for (let attempt = 1; attempt <= 4; attempt++) {
        try { await verify(); console.log(`Verified live deployment: ${expected.revision}`); return; }
        catch (error) {
            if (attempt === 4) throw error;
            console.warn(`Verification attempt ${attempt}: ${error.message}`);
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
