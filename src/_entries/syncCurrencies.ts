import { appsScriptProperties } from 'appsScriptProperties';
import { syncCurrencies as origin } from 'core/currencies';
import { assertEnvs } from 'asserts';

function syncCurrencies() {
  assertEnvs(appsScriptProperties);

  const { CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID, NOTION_SECRET } = appsScriptProperties;
  origin(CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID, NOTION_SECRET);
}

syncCurrencies();
