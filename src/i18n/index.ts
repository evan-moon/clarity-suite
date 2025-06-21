import { enConfig, koConfig } from './texts';
import { I18nConfig, Language } from './types';

const LANGUAGE = 'ko';

export function t(key: keyof I18nConfig['properties']): string {
  return LANGUAGE === 'ko' ? koConfig.properties[key] : enConfig.properties[key];
}
