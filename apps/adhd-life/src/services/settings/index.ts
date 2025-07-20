import { applySettingsFromNotionVariables } from '@clarity-suite/settings';
import { SCRIPT_PROPERTIES_MAP, DATABASE_PROPERTIES } from './constants';

export function applySettingsFromSheetForAdhdLife() {
	applySettingsFromNotionVariables({
		SCRIPT_PROPERTIES_MAP,
		DATABASE_PROPERTIES,
	});
}
