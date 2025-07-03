import { appsScriptProperties } from 'appsScriptProperties';
import { syncRealtimeStocks } from 'services/realtimeStocks';
import { assertEnv } from 'asserts';
import { syncRealtimeCurrencies } from 'services/realtimeCurrencies';

function updateRealtimeServices() {
  const { STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID, CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID } =
    appsScriptProperties;
  assertEnv('STOCKS_SHEET_NAME', STOCKS_SHEET_NAME);
  assertEnv('STOCKS_NOTION_DB_ID', STOCKS_NOTION_DB_ID);
  assertEnv('CURRENCIES_SHEET_NAME', CURRENCIES_SHEET_NAME);
  assertEnv('CURRENCIES_NOTION_DB_ID', CURRENCIES_NOTION_DB_ID);

  syncRealtimeStocks(STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID);
  syncRealtimeCurrencies(CURRENCIES_SHEET_NAME, CURRENCIES_NOTION_DB_ID);
}

updateRealtimeServices();
