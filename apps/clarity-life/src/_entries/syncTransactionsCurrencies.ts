import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { syncTradebookTransactionsCurrencies as _syncTradebookTransactionsCurrencies } from 'services/tradebook';

import { assertEnv } from '@clarity-suite/utils';

function syncTransactionsCurrencies() {
	const {
		STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
		STOCK_TRANSACTION_NOTION_DB_ID,
	} = appsScriptProperties;
	assertEnv(
		'STOCK_TRANSACTION_CURRENCIES_SHEET_NAME',
		STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
	);
	assertEnv('STOCK_TRANSACTION_NOTION_DB_ID', STOCK_TRANSACTION_NOTION_DB_ID);

	_syncTradebookTransactionsCurrencies(
		STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
		STOCK_TRANSACTION_NOTION_DB_ID,
	);
}

syncTransactionsCurrencies();
