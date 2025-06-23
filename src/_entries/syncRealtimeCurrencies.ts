import { appsScriptProperties } from 'appsScriptProperties';
import { syncRealtimeCurrencies as _syncRealtimeCurrencies } from 'services/realtimeCurrencies';
import { assertEnvs } from 'asserts';

function syncRealtimeCurrencies() {
  assertEnvs(appsScriptProperties);

  const { CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID } = appsScriptProperties;
  _syncRealtimeCurrencies(CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID);
}

syncRealtimeCurrencies();
