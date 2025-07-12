const path = require('path');
const { buildMultiEntry } = require('@clarity-suite/esbuild-config');

const alias = {
	batches: path.resolve(__dirname, '../src/batches'),
	notion: path.resolve(__dirname, '../src/notion'),
	setting: path.resolve(__dirname, '../src/setting'),
	i18n: path.resolve(__dirname, '../src/i18n'),
	asserts: path.resolve(__dirname, '../src/asserts.ts'),
	appsScriptProperties: path.resolve(
		__dirname,
		'../src/appsScriptProperties.ts',
	),
	sheet: path.resolve(__dirname, '../src/sheet.ts'),
};

buildMultiEntry({
	entriesDir: path.resolve(__dirname, '../src/_entries'),
	entryExt: '.ts',
	outdir: path.resolve(__dirname, '../dist'),
	alias,
	appsscriptJsonPath: path.resolve(__dirname, '../appsscript.json'),
});
