export type ScriptPropertyKeys =
	| 'NOTION_SECRET'
	| 'TASKS_NOTION_DB_ID'
	| 'TASKS_SNAPSHOT_NOTION_DB_ID'
	| 'WEEKLY_REPORTS_NOTION_DB_ID';

type DatabasePropertyKeys = Exclude<ScriptPropertyKeys, 'NOTION_SECRET'>;

type PropertyKeyInSpreadSheet = string;
export const SCRIPT_PROPERTIES_MAP: Record<
	PropertyKeyInSpreadSheet,
	ScriptPropertyKeys
> = {
	'Notion Integration Secret': 'NOTION_SECRET',
	'Tasks Notion DB': 'TASKS_NOTION_DB_ID',
	'Tasks Snapshots Notion DB': 'TASKS_SNAPSHOT_NOTION_DB_ID',
	'Reports Notion DB': 'WEEKLY_REPORTS_NOTION_DB_ID',
};

export const DATABASE_PROPERTIES: DatabasePropertyKeys[] = [
	'TASKS_NOTION_DB_ID',
	'TASKS_SNAPSHOT_NOTION_DB_ID',
	'WEEKLY_REPORTS_NOTION_DB_ID',
];
