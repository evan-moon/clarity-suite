# @clarity-suite/esbuild-config

공통 esbuild 설정을 함수로 제공하는 패키지입니다.

## 사용법

앱별 esbuild.config.js에서 다음과 같이 사용하세요:

```js
const createBaseConfig = require('../../packages/esbuild-config/base');
const esbuild = require('esbuild');

const alias = { /* 앱별 alias */ };
const config = createBaseConfig({
  alias,
  entryPoints: [...],
  outfile: 'dist/xxx.js',
  globalName: 'xxx',
});

esbuild.build(config);
```

- alias 등 도메인별 설정은 각 앱에서 관리
- 공통 빌드 옵션/로직은 이 패키지에서 관리 

## 멀티엔트리 빌드/합치기/stripIIFE 공통화

```js
const { buildMultiEntry } = require('@clarity-suite/esbuild-config/multi-entry-build');

buildMultiEntry({
  entriesDir: 'src/_entries',
  entryExt: '.ts',
  outdir: 'dist',
  alias: { /* 앱별 alias */ },
  appsscriptJsonPath: 'appsscript.json',
});
```

- 파일명/alias만 인자로 넘기면 나머지 빌드/합치기/stripIIFE/정리까지 자동화 