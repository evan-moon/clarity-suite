import { assertEnv } from '@clarity-suite/utils';
import { appsScriptProperties } from '../services/_shared/appsScriptProperties';
import { generateWeeklyReport as _generateWeeklyReport } from '../services/reports';

function generateWeeklyReport() {
	assertEnv(
		'WEEKLY_REPORTS_NOTION_DB_ID',
		appsScriptProperties.WEEKLY_REPORTS_NOTION_DB_ID,
	);
	assertEnv(
		'TASKS_SNAPSHOT_NOTION_DB_ID',
		appsScriptProperties.TASKS_SNAPSHOT_NOTION_DB_ID,
	);

	_generateWeeklyReport(
		appsScriptProperties.WEEKLY_REPORTS_NOTION_DB_ID,
		appsScriptProperties.TASKS_SNAPSHOT_NOTION_DB_ID,
	);
}

generateWeeklyReport();
