import { appsScriptProperties } from '../appsScriptProperties';
import { syncCurrencyInTransactions as origin } from '../batches/transactions';
import { assertEnvs } from '../asserts';

function syncTransactions() {
  assertEnvs(appsScriptProperties);
  origin(appsScriptProperties.TRANSACTION_CURRENCIES_SHEET_NAME, appsScriptProperties.TRANSACTION_NOTION_DB_ID);
}

syncTransactions();
