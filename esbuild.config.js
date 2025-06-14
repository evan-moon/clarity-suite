const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const builds = ['batch', 'onOpen', 'syncStocks', 'syncCurrencies', 'syncTransactions'];

const replaceIIFEtoExpression = (filePath, functionName) => {
  const code = fs.readFileSync(filePath, 'utf-8');
  const result = code
    .replace(new RegExp(`var\\s+${functionName}\\s*=\\s*\\(\\(\\)\\s*=>\\s*{`), `var ${functionName} = () => {`)
    .replace(/\}\)\(\);?[\s;]*$/, '};');

  fs.writeFileSync(filePath, result);
};

const copyToAppsScriptManifest = () => {
  const source = path.resolve(__dirname, 'appsscript.json');
  const destination = path.resolve(__dirname, 'dist/appsscript.json');
  fs.copyFileSync(source, destination);
};

console.log('⚙️ 빌드를 시작합니다...');

Promise.all(
  builds.map(functionName => {
    console.log(`👀 ${functionName} 함수를 살펴보고 있어요...`);

    const outfile = `dist/${functionName}.js`;

    return esbuild
      .build({
        entryPoints: [`src/_entries/${functionName}.ts`],
        outfile,
        // minify: true,
        bundle: true,
        treeShaking: true,
        target: 'es2015',
        platform: 'browser',
        format: 'iife',
        globalName: functionName,
      })
      .then(() => {
        console.log(`🎁 ${functionName} 번들링이 완료되었어요.`);
        replaceIIFEtoExpression(outfile, functionName);
        console.log(`📖 ${functionName} 함수를 전역 스코프에 노출했어요.`);
        copyToAppsScriptManifest();
        console.log(`✅ ${functionName} 빌드가 완료되었어요.`);
      });
  })
)
  .then(() => {
    console.log(`\n✅ 전체 빌드가 완료되었어요.`);
  })
  .catch(() => process.exit(1));
