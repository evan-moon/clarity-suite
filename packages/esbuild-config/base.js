module.exports = function createBaseConfig({
	alias = {},
	entryPoints = [],
	outfile,
	outdir,
	globalName,
} = {}) {
	return {
		bundle: true,
		minify: true,
		target: 'es2015',
		platform: 'browser',
		format: 'iife',
		alias,
		entryPoints,
		outfile,
		outdir,
		globalName,
	};
};
