import { enConfig } from './texts';
import { I18nConfig } from './types';

export function t(key: keyof I18nConfig['properties']): string {
	return enConfig.properties[key];
}
