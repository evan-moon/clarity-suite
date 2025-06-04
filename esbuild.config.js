const esbuild = require('esbuild');
const fs = require('fs');

const outfile = 'dist/index.js';

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outfile,
    bundle: true,
    minify: true,
    treeShaking: false,
    target: 'es2019',
    platform: 'browser',
    format: 'iife',
    globalName: 'sync',
  })
  .then(() => {
    const code = fs.readFileSync(outfile, 'utf-8');
    const result = code
      .replace(/var\s+sync\s*=\s*\(\(\)\s*=>\s*{/, 'var sync = () => {')
      .replace(/\}\)\(\);?[\s;]*$/, '};');

    fs.writeFileSync(outfile, result);
  })
  .catch(() => process.exit(1));
