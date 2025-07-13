import { applySettingsFromSheet, SettingConfig } from '@clarity-suite/settings';
import { SCRIPT_PROPERTIES_MAP, DATABASE_PROPERTIES } from './constants';

const config: SettingConfig = {
	SHEET_NAME: 'Setting',
	SCRIPT_PROPERTIES_MAP,
	DATABASE_PROPERTIES,
};

export function applySettingsFromSheetForAdhdLife() {
	applySettingsFromSheet(config);
}
