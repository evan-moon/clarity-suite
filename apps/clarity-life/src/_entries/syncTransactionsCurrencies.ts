import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { syncTradebookTransactionsCurrencies as _syncTradebookTransactionsCurrencies } from 'services/tradebook';

import { assert } from '@clarity-suite/utils';

function syncTransactionsCurrencies() {
	const {
		STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
		STOCK_TRANSACTION_NOTION_DB_ID,
	} = appsScriptProperties;
	assert(STOCK_TRANSACTION_CURRENCIES_SHEET_NAME, 'The script property "STOCK_TRANSACTION_CURRENCIES_SHEET_NAME" is not set. Please check Project Settings > Script properties.');
	assert(STOCK_TRANSACTION_NOTION_DB_ID, 'The script property "STOCK_TRANSACTION_NOTION_DB_ID" is not set. Please check Project Settings > Script properties.');

	_syncTradebookTransactionsCurrencies(
		STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
		STOCK_TRANSACTION_NOTION_DB_ID,
	);
}

syncTransactionsCurrencies();
