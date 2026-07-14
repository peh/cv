// Render docs/index.html to docs/index.pdf using an installed Chrome/Chromium
// in headless mode. The page is fully self-contained (inlined CSS, inline SVG),
// so a file:// URL is enough — no local web server required.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = resolve(root, 'docs/index.html');
const output = resolve(root, 'docs/index.pdf');

const CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const chrome = CANDIDATES.find((p) => existsSync(p));

if (!chrome) {
  console.error(
    'No Chrome/Chromium found. Set CHROME_PATH to your browser binary.',
  );
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`Missing ${input}. Run "npm run build:html" first.`);
  process.exit(1);
}

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${output}`,
  pathToFileURL(input).href,
]);

console.log(`PDF written to ${output}`);
