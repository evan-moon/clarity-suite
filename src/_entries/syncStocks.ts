import { appsScriptProperties } from '../appsScriptProperties';
import { syncStocks as origin } from '../batches/stocks';
import { assertEnvs } from '../asserts';

function syncStocks() {
  assertEnvs(appsScriptProperties);

  const { STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID } = appsScriptProperties;

  origin(STOCKS_SHEET_NAME, STOCKS_NOTION_DB_ID);
}

syncStocks();
