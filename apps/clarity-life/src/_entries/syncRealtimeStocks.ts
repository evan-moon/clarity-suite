import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { syncRealtimeStocks as _syncRealtimeStocks } from 'services/realtimeStocks';
import { assertEnv } from 'services/_shared/asserts';

function syncRealtimeStocks() {
	const { STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID } = appsScriptProperties;
	assertEnv('STOCKS_SHEET_NAME', STOCKS_SHEET_NAME);
	assertEnv('STOCKS_NOTION_DB_ID', STOCKS_NOTION_DB_ID);

	_syncRealtimeStocks(STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID);
}

syncRealtimeStocks();
