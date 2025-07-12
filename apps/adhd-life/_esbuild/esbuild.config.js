const path = require('path');
const { buildMultiEntry } = require('@clarity-suite/esbuild-config');

const alias = {
	// 필요한 경우 서비스별로 추가
};

buildMultiEntry({
	entriesDir: path.resolve(__dirname, '../src/_entries'),
	entryExt: '.ts',
	outdir: path.resolve(__dirname, '../dist'),
	alias,
	appsscriptJsonPath: path.resolve(__dirname, '../appsscript.json'),
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
