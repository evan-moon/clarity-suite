import { appsScriptProperties } from 'appsScriptProperties';
import { syncCurrencyInTransactions as origin } from 'batches/transactions';
import { assertEnvs } from 'asserts';

function syncTransactions() {
  assertEnvs(appsScriptProperties);
  const { TRANSACTION_CURRENCIES_SHEET_NAME, TRANSACTION_NOTION_DB_ID, NOTION_SECRET } = appsScriptProperties;
  origin(TRANSACTION_CURRENCIES_SHEET_NAME, TRANSACTION_NOTION_DB_ID, NOTION_SECRET);
}

syncTransactions();
