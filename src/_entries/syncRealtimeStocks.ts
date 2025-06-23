import { appsScriptProperties } from 'appsScriptProperties';
import { syncRealtimeStocks as _syncRealtimeStocks } from 'services/realtimeStocks';
import { assertEnvs } from 'asserts';

function syncRealtimeStocks() {
  assertEnvs(appsScriptProperties);

  const { STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID, NOTION_SECRET } = appsScriptProperties;
  _syncRealtimeStocks(STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID, NOTION_SECRET);
}

syncRealtimeStocks();
