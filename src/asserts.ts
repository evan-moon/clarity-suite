import { appsScriptProperties } from 'appsScriptProperties';

function assert<T>(variable: T, message: string): asserts variable is NonNullable<T> {
  if (variable == null) {
    throw new TypeError(message);
  }
}

export function assertEnv(envName: string, env?: string | null): asserts env {
  assert(env, `The script property "${envName}" is not set. Please check Project Settings > Script properties.`);
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
