import { defineConfig } from 'astro/config';

// Static CV site. Source of truth is ../resume.json (JSON Resume schema).
// Builds into ./docs so GitHub Pages (eschenbach.co) serves it directly.
export default defineConfig({
  site: 'https://eschenbach.co',
  outDir: './docs',
  build: {
    // Inline all CSS into the HTML so the page is a single self-contained file.
    // Keeps the deployed site simple and makes headless-Chrome PDF export trivial.
    inlineStylesheets: 'always',
  },
});
