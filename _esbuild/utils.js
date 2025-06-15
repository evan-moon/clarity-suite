const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const stripIIFE = (filePath, functionName) => {
  const code = fs.readFileSync(filePath, 'utf-8');
  const result = code
    .replace(new RegExp(`var\\s+${functionName}\\s*=\\s*\\(\\(\\)\\s*=>\\s*{`), `var ${functionName} = () => {`)
    .replace(/\}\)\(\);?[\s;]*$/, '};');

  fs.writeFileSync(filePath, result);
};

const buildIndividualFunctions = async builds => {
  console.log('⚙️ 개별 함수 빌드를 시작합니다...');

  await Promise.all(
    builds.map(async functionName => {
      console.log(`👀 ${functionName} 함수를 빌드하고 있어요...`);

      const outfile = `dist/${functionName}.js`;

      await esbuild.build({
        entryPoints: [`src/_entries/${functionName}.ts`],
        outfile,
        minify: true,
        bundle: true,
        treeShaking: true,
        target: 'es2015',
        platform: 'browser',
        format: 'iife',
        globalName: functionName,
      });

      console.log(`🎁 ${functionName} 빌드가 완료되었어요.`);

      stripIIFE(outfile, functionName);
      console.log(`📖 ${functionName} 함수를 전역 스코프에 노출했어요.`);
    })
  );
};

const combineBuiltFiles = async builds => {
  console.log('📦 빌드 파일들을 하나로 합치는 중...');

  const distDir = path.resolve(__dirname, '../dist');
  const files = builds.map(name => path.join(distDir, `${name}.js`));

  const combinedContent = files.map(file => fs.readFileSync(file, 'utf-8')).join('\n\n');

  fs.writeFileSync(path.join(distDir, 'app.js'), combinedContent);

  console.log('📦 모든 빌드 파일이 app.js로 통합되었어요.');
};

const finalizeBuild = () => {
  console.log('🧹 빌드 정리 중...');

  const distDir = path.resolve(__dirname, '../dist');
  const files = fs.readdirSync(distDir);

  files.forEach(file => {
    if (file !== 'app.js' && file !== 'appsscript.json') {
      fs.unlinkSync(path.join(distDir, file));
    }
  });

  const source = path.resolve(__dirname, '../appsscript.json');
  const destination = path.resolve(__dirname, '../dist/appsscript.json');
  fs.copyFileSync(source, destination);

  console.log('🧹 빌드 정리가 완료되었어요.');
};

module.exports = {
  stripIIFE,
  buildIndividualFunctions,
  combineBuiltFiles,
  finalizeBuild,
};
