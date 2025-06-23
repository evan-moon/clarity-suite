import { appsScriptProperties } from 'appsScriptProperties';
import { syncTradebookTransactionsCurrencies as _syncTradebookTransactionsCurrencies } from 'services/tradebook';
import { syncPiggyTransactionsCurrencies as _syncPiggyTransactionsCurrencies } from 'services/piggy';

import { assertEnvs } from 'asserts';

function syncTransactionsCurrencies() {
  assertEnvs(appsScriptProperties);
  const {
    STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
    STOCK_TRANSACTION_NOTION_DB_ID,
    POCKETBOOK_TRANSACTION_SHEET_NAME,
    POCKETBOOK_TRANSACTION_NOTION_DB_ID,
  } = appsScriptProperties;
  _syncTradebookTransactionsCurrencies(STOCK_TRANSACTION_CURRENCIES_SHEET_NAME, STOCK_TRANSACTION_NOTION_DB_ID);
  _syncPiggyTransactionsCurrencies(POCKETBOOK_TRANSACTION_SHEET_NAME, POCKETBOOK_TRANSACTION_NOTION_DB_ID);
}

syncTransactionsCurrencies();
