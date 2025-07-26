import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { syncRealtimeStocks as _syncRealtimeStocks } from 'services/realtimeStocks';
import { assert } from '@clarity-suite/utils';

function syncRealtimeStocks() {
	const { STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID } = appsScriptProperties;
	assert(STOCKS_SHEET_NAME, 'The script property "STOCKS_SHEET_NAME" is not set. Please check Project Settings > Script properties.');
	assert(STOCKS_NOTION_DB_ID, 'The script property "STOCKS_NOTION_DB_ID" is not set. Please check Project Settings > Script properties.');

	_syncRealtimeStocks(STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID);
}

syncRealtimeStocks();
