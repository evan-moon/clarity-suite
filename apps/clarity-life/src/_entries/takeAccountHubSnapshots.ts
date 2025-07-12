import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { takeAccountHubSnapshots as _takeAccountHubSnapshots } from 'services/accountHub';
import { assertEnv } from 'services/_shared/asserts';

function takeAccountHubSnapshots() {
	const { ACCOUNT_HUB_NOTION_DB_ID, ACCOUNT_SNAPSHOT_NOTION_DB_ID } =
		appsScriptProperties;
	assertEnv('ACCOUNT_HUB_NOTION_DB_ID', ACCOUNT_HUB_NOTION_DB_ID);
	assertEnv('ACCOUNT_SNAPSHOT_NOTION_DB_ID', ACCOUNT_SNAPSHOT_NOTION_DB_ID);

	_takeAccountHubSnapshots(
		ACCOUNT_HUB_NOTION_DB_ID,
		ACCOUNT_SNAPSHOT_NOTION_DB_ID,
	);
}

takeAccountHubSnapshots();
