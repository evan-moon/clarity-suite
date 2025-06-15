const { buildIndividualFunctions, combineBuiltFiles, finalizeBuild } = require('./utils');

const builds = ['batch', 'onOpen', 'syncStocks', 'syncCurrencies', 'syncTransactions'];

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
