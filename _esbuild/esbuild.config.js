const { buildIndividualFunctions, combineBuiltFiles, finalizeBuild } = require('./utils');
const fs = require('fs');
const path = require('path');

const entriesDir = path.resolve(__dirname, '../src/_entries');
const builds = fs
  .readdirSync(entriesDir)
  .filter(file => file.endsWith('.ts'))
  .map(file => path.basename(file, '.ts'));

const runBuild = async () => {
  try {
    await buildIndividualFunctions(builds);
    await combineBuiltFiles(builds);
    finalizeBuild();
    console.log('\n✅ 전체 빌드가 완료되었어요.');
  } catch (error) {
    console.error('❌ 빌드 중 오류가 발생했어요:', error);
    process.exit(1);
  }
};

runBuild();
