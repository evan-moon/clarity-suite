import { appsScriptProperties } from 'appsScriptProperties';
import { syncRealtimeStocks } from 'services/realtimeStocks';
import { assertEnvs } from 'asserts';
import { syncRealtimeCurrencies } from 'services/realtimeCurrencies';

function updateRealtimeServices() {
  assertEnvs(appsScriptProperties);

  const { STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID, CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID } =
    appsScriptProperties;

  syncRealtimeStocks(STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID);
  syncRealtimeCurrencies(CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID);
}

updateRealtimeServices();
