import { assertEnv } from '@clarity-suite/utils';
import { appsScriptProperties } from '../services/_shared/appsScriptProperties';
import { takeAdhdLifeSnapshots as _takeAdhdLifeSnapshots } from '../services/adhdSnapshot';

function takeAdhdLifeSnapshots() {
	const { TASKS_NOTION_DB_ID, TASKS_SNAPSHOT_NOTION_DB_ID } =
		appsScriptProperties;
	assertEnv('TASKS_NOTION_DB_ID', TASKS_NOTION_DB_ID);
	assertEnv('TASKS_SNAPSHOT_NOTION_DB_ID', TASKS_SNAPSHOT_NOTION_DB_ID);

	_takeAdhdLifeSnapshots(TASKS_NOTION_DB_ID, TASKS_SNAPSHOT_NOTION_DB_ID);
}

takeAdhdLifeSnapshots();
