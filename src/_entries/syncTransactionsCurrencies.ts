import { appsScriptProperties } from 'appsScriptProperties';
import {
  syncPocketbookTransactionsCurrencies as originPocketbook,
  syncStockTransactionsCurrencies as originStock,
} from 'core/transactions';

import { assertEnvs } from 'asserts';

function syncTransactionsCurrencies() {
  assertEnvs(appsScriptProperties);
  const {
    STOCK_TRANSACTION_CURRENCIES_SHEET_NAME,
    STOCK_TRANSACTION_NOTION_DB_ID,
    POCKETBOOK_TRANSACTION_SHEET_NAME,
    POCKETBOOK_TRANSACTION_NOTION_DB_ID,
    NOTION_SECRET,
  } = appsScriptProperties;
  originStock(STOCK_TRANSACTION_CURRENCIES_SHEET_NAME, STOCK_TRANSACTION_NOTION_DB_ID, NOTION_SECRET);
  originPocketbook(POCKETBOOK_TRANSACTION_SHEET_NAME, POCKETBOOK_TRANSACTION_NOTION_DB_ID, NOTION_SECRET);
}

syncTransactionsCurrencies();
