import { enConfig } from './texts';
import { I18nConfig, Language } from './types';

const LANGUAGE: Language = 'en';

export function t(key: keyof I18nConfig['properties']): string {
	return enConfig.properties[key];
}
