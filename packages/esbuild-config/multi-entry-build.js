const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const createBaseConfig = require('./base');

const stripIIFE = (filePath, functionName) => {
	const code = fs.readFileSync(filePath, 'utf-8');
	const result = code
		.replace(
			new RegExp(`var\\s+${functionName}\\s*=\\s*\\(\\(\\)\\s*=>\\s*{`),
			`var ${functionName} = () => {`,
		)
		.replace(/\}\)\(\);?[\s;]*$/, '};');

	fs.writeFileSync(filePath, result);
	console.log(`  [stripIIFE] ${path.basename(filePath)} 변환 완료`);
};

async function buildMultiEntry({
	entriesDir,
	entryExt = '.ts',
	outdir = 'dist',
	alias = {},
	appsscriptJsonPath = null,
}) {
	console.log('[esbuild-config] 엔트리 디렉토리:', entriesDir);
	const builds = fs
		.readdirSync(entriesDir)
		.filter((file) => file.endsWith(entryExt))
		.map((file) => path.basename(file, entryExt));
	console.log(`[esbuild-config] 빌드할 엔트리: ${builds.join(', ')}`);

	// 1. 각 엔트리별 빌드
	await Promise.all(
		builds.map(async (functionName) => {
			const outfile = path.join(outdir, `${functionName}.js`);
			const config = createBaseConfig({
				alias,
				entryPoints: [path.join(entriesDir, `${functionName}${entryExt}`)],
				outfile,
				globalName: functionName,
			});
			console.log(`  [esbuild] ${functionName} 빌드 시작...`);
			await esbuild.build(config);
			console.log(`  [esbuild] ${functionName} 빌드 완료 → ${outfile}`);
			stripIIFE(outfile, functionName);
		}),
	);

	// 2. 파일 합치기
	const files = builds.map((name) => path.join(outdir, `${name}.js`));
	console.log(
		`[esbuild-config] 파일 합치기: ${files.map((f) => path.basename(f)).join(', ')}`,
	);
	const combinedContent = files
		.map((file) => fs.readFileSync(file, 'utf-8'))
		.join('\n\n');
	const appJsPath = path.join(outdir, 'app.js');
	fs.writeFileSync(appJsPath, combinedContent);
	console.log(`[esbuild-config] app.js 생성 완료 → ${appJsPath}`);

	// 3. 정리: 개별 파일 삭제, appsscript.json 복사
	files.forEach((file) => {
		fs.unlinkSync(file);
		console.log(`  [정리] ${path.basename(file)} 삭제`);
	});
	if (appsscriptJsonPath) {
		fs.copyFileSync(appsscriptJsonPath, path.join(outdir, 'appsscript.json'));
		console.log(`[esbuild-config] appsscript.json 복사 완료`);
	}
	console.log('[esbuild-config] 빌드 전체 완료!');
}

module.exports = { buildMultiEntry };
