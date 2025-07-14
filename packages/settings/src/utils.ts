import {
	PropertyKeyInSpreadSheet,
	ScriptPropertyKeys,
	SettingConfig,
} from './types';
import { createNotionClient } from '@clarity-suite/notion';

export function isValidScriptProperty(
	key: string,
	SCRIPT_PROPERTIES_MAP: Record<PropertyKeyInSpreadSheet, ScriptPropertyKeys>,
): key is keyof typeof SCRIPT_PROPERTIES_MAP {
	return key in SCRIPT_PROPERTIES_MAP;
}

export function findDatabaseId(token: string, name: string): string {
	Logger.log(`[findDatabaseId] name: ${name}`);
	const notion = createNotionClient(token);
	if (!token || !name) {
		Logger.log('[findDatabaseId] token or name missing');
		return '';
	}
	if (name.replace(/-/g, '').length >= 32) {
		Logger.log(`[findDatabaseId] name looks like an ID: ${name}`);
		return name.replace(/-/g, '');
	}
	const response = notion.findDatabaseByName(name, token);
	Logger.log(
		`[findDatabaseId] Notion search results: ${JSON.stringify(response.results)}`,
	);
	if (response.results.length === 0) {
		Logger.log(`[findDatabaseId] No database found for name: ${name}`);
		throw new Error(`Could not find a database named "${name}".`);
	}
	if (response.results.length > 1) {
		Logger.log(`[findDatabaseId] Multiple databases found for name: ${name}`);
		throw new Error(
			`There are multiple databases named "${name}". Please use a unique name.`,
		);
	}
	const result = response.results[0].id;
	Logger.log(`[findDatabaseId] Found database ID: ${result}`);
	return result ? result.replace(/-/g, '') : '';
}

export function applySettingsFromSheet(config: SettingConfig): void {
	Logger.log(
		`[applySettingsFromSheet] Start with config: ${JSON.stringify(config)}`,
	);
	const sheet = SpreadsheetApp.getActive().getSheetByName(config.SHEET_NAME);
	if (!sheet) {
		Logger.log(
			`[applySettingsFromSheet] Sheet not found: ${config.SHEET_NAME}`,
		);
		SpreadsheetApp.getUi().alert(`⚠️ "${config.SHEET_NAME}" sheet not found.`);
		return;
	}
	const last = sheet.getLastRow();
	Logger.log(`[applySettingsFromSheet] Last row: ${last}`);
	const values = sheet.getRange(2, 1, last - 1, 2).getValues() as string[][];
	Logger.log(`[applySettingsFromSheet] Read values: ${JSON.stringify(values)}`);
	const rawProps: Record<string, string> = {};
	values.forEach(([name, value]) => {
		const trimmedName = name.trim();
		if (isValidScriptProperty(trimmedName, config.SCRIPT_PROPERTIES_MAP)) {
			const key = config.SCRIPT_PROPERTIES_MAP[trimmedName];
			rawProps[key] = String(value).trim();
			Logger.log(
				`[applySettingsFromSheet] Set rawProp: ${key} = ${rawProps[key]}`,
			);
		}
	});
	const notionSecret = rawProps['NOTION_SECRET'];
	Logger.log(`[applySettingsFromSheet] NOTION_SECRET: ${notionSecret}`);
	if (!notionSecret) {
		Logger.log('[applySettingsFromSheet] Notion token missing');
		SpreadsheetApp.getUi().alert('⚠️ Please enter Notion token first.');
		return;
	}
	try {
		const finalProps: Record<string, string> = { NOTION_SECRET: notionSecret };
		config.DATABASE_PROPERTIES.forEach((key) => {
			const val = rawProps[key];
			Logger.log(`[applySettingsFromSheet] DB property: ${key} = ${val}`);
			if (!val) return;
			finalProps[key] = findDatabaseId(notionSecret, val);
			Logger.log(
				`[applySettingsFromSheet] Final prop set: ${key} = ${finalProps[key]}`,
			);
		});
		Logger.log(
			`[applySettingsFromSheet] Setting script properties: ${JSON.stringify(finalProps)}`,
		);
		PropertiesService.getScriptProperties().setProperties(finalProps, true);
		SpreadsheetApp.getActiveSpreadsheet().toast(
			'✅ Successfully connected to Notion',
			'Complete',
			5,
		);
	} catch (e) {
		const message =
			e instanceof Error ? e.message : 'An unknown error occurred.';
		Logger.log(`[applySettingsFromSheet] Error: ${message}`);
		SpreadsheetApp.getUi().alert(`❌ ${message}`);
	}
}
