import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { syncRealtimeCurrencies as _syncRealtimeCurrencies } from 'services/realtimeCurrencies';
import { assert } from '@clarity-suite/utils';

function syncRealtimeCurrencies() {
	const { CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID } =
		appsScriptProperties;
	assert(CURRENCIES_SHEET_NAME, 'The script property "CURRENCIES_SHEET_NAME" is not set. Please check Project Settings > Script properties.');
	assert(CURRENCIES_NOTION_DB_ID, 'The script property "CURRENCIES_NOTION_DB_ID" is not set. Please check Project Settings > Script properties.');

	_syncRealtimeCurrencies(CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID);
}

syncRealtimeCurrencies();
