import { enConfig, koConfig } from './texts';
import { I18nConfig, Language } from './types';

const LANGUAGE: Language = 'en';

export function t(key: keyof I18nConfig['properties']): string {
  switch (LANGUAGE) {
    case 'ko':
      return koConfig.properties[key];
    case 'en':
      return enConfig.properties[key];
    default:
      return enConfig.properties[key];
  }
}
