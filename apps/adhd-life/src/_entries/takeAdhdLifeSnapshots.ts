import { assert } from '@clarity-suite/utils';
import { appsScriptProperties } from '../services/_shared/appsScriptProperties';
import { takeAdhdLifeSnapshots as _takeAdhdLifeSnapshots } from '../services/adhdSnapshot';

function takeAdhdLifeSnapshots() {
	const { TASKS_NOTION_DB_ID, TASKS_SNAPSHOT_NOTION_DB_ID } =
		appsScriptProperties;
	assert(TASKS_NOTION_DB_ID, 'The script property "TASKS_NOTION_DB_ID" is not set. Please check Project Settings > Script properties.');
	assert(TASKS_SNAPSHOT_NOTION_DB_ID, 'The script property "TASKS_SNAPSHOT_NOTION_DB_ID" is not set. Please check Project Settings > Script properties.');

	_takeAdhdLifeSnapshots(TASKS_NOTION_DB_ID, TASKS_SNAPSHOT_NOTION_DB_ID);
}

takeAdhdLifeSnapshots();
