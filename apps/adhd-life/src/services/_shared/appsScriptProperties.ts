import type { ScriptPropertyKeys } from 'services/settings/constants';

type SheetNameProperties = 'TASKS_NOTION_DB_ID' | 'TASKS_SNAPSHOT_NOTION_DB_ID';

export const appsScriptProperties: Record<
	ScriptPropertyKeys | SheetNameProperties,
	string | null
> = {
	NOTION_SECRET:
		PropertiesService.getScriptProperties().getProperty('NOTION_SECRET') ??
		'INVALID_SECRET',
	TASKS_NOTION_DB_ID:
		PropertiesService.getScriptProperties().getProperty('TASKS_NOTION_DB_ID'),
	TASKS_SNAPSHOT_NOTION_DB_ID:
		PropertiesService.getScriptProperties().getProperty(
			'TASKS_SNAPSHOT_NOTION_DB_ID',
		),
	WEEKLY_REPORTS_NOTION_DB_ID:
		PropertiesService.getScriptProperties().getProperty(
			'WEEKLY_REPORTS_NOTION_DB_ID',
		),
} as const;
