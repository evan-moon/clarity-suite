import { appsScriptProperties } from '../appsScriptProperties';
import { syncCurrencies as origin } from '../batches/currencies';
import { assertEnvs } from '../asserts';

function syncCurrencies() {
  assertEnvs(appsScriptProperties);

  const { CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID } = appsScriptProperties;
  origin(CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID);
}

syncCurrencies();
