import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { syncRealtimeCurrencies as _syncRealtimeCurrencies } from 'services/realtimeCurrencies';
import { assertEnv } from 'services/_shared/asserts';

function syncRealtimeCurrencies() {
  const { CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID } = appsScriptProperties;
  assertEnv('CURRENCIES_SHEET_NAME', CURRENCIES_SHEET_NAME);
  assertEnv('CURRENCIES_NOTION_DB_ID', CURRENCIES_NOTION_DB_ID);

  _syncRealtimeCurrencies(CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID);
}

syncRealtimeCurrencies();
