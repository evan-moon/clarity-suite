import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { syncTradebookTransactionsCurrencies as _syncTradebookTransactionsCurrencies } from 'services/tradebook';
import { syncPiggyTransactionsCurrencies as _syncPiggyTransactionsCurrencies } from 'services/piggy';

import { assertEnv } from 'services/_shared/asserts';

function syncTransactionsCurrencies() {
  const {
    STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
    STOCK_TRANSACTION_NOTION_DB_ID,
    PIGGY_TRANSACTION_SHEET_NAME,
    PIGGY_TRANSACTION_NOTION_DB_ID,
  } = appsScriptProperties;
  assertEnv('STOCK_TRANSACTION_CURRENCIES_SHEET_NAME', STOCK_TRANSACTION_CURRENCIES_SHEET_NAME);
  assertEnv('STOCK_TRANSACTION_NOTION_DB_ID', STOCK_TRANSACTION_NOTION_DB_ID);
  assertEnv('PIGGY_TRANSACTION_SHEET_NAME', PIGGY_TRANSACTION_SHEET_NAME);
  assertEnv('PIGGY_TRANSACTION_NOTION_DB_ID', PIGGY_TRANSACTION_NOTION_DB_ID);

  _syncTradebookTransactionsCurrencies(STOCK_TRANSACTION_CURRENCIES_SHEET_NAME, STOCK_TRANSACTION_NOTION_DB_ID);
  _syncPiggyTransactionsCurrencies(PIGGY_TRANSACTION_SHEET_NAME, PIGGY_TRANSACTION_NOTION_DB_ID);
}

syncTransactionsCurrencies();
