import { appsScriptProperties } from 'appsScriptProperties';

function assert<T>(variable: T, message: string): asserts variable is NonNullable<T> {
  if (variable == null) {
    throw new TypeError(message);
  }
}

function assertEnv(envName: string, env?: string | null): asserts env {
  assert(env, `Apps Script 속성에 ${envName} 값이 존재하지 않아요. 프로젝트 설정 > 스크립트 속성 메뉴를 확인해주세요.`);
}

type ValidatedAppsScriptProperties = {
  [K in keyof typeof appsScriptProperties]: string;
};

export function assertEnvs(
  properties: typeof appsScriptProperties
): asserts properties is ValidatedAppsScriptProperties {
  Object.entries(properties).forEach(([key, value]) => {
    assertEnv(key, value);
  });
}
