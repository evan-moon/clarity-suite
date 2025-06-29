import { appsScriptProperties } from 'appsScriptProperties';
import { assertEnvs } from 'asserts';
import { clearNotionTable } from 'services/common/index';

function cleanUpClarityLife() {
  assertEnvs(appsScriptProperties);

  const {
    PIGGY_TRANSACTION_NOTION_DB_ID,
    STOCK_TRANSACTION_NOTION_DB_ID,
    ACCOUNT_HUB_NOTION_DB_ID,
    ACCOUNT_SNAPSHOT_NOTION_DB_ID,
    PORTFOLIO_NOTION_DB_ID,
  } = appsScriptProperties;

  clearNotionTable(PIGGY_TRANSACTION_NOTION_DB_ID);
  clearNotionTable(STOCK_TRANSACTION_NOTION_DB_ID);
  clearNotionTable(ACCOUNT_HUB_NOTION_DB_ID);
  clearNotionTable(ACCOUNT_SNAPSHOT_NOTION_DB_ID);
  clearNotionTable(PORTFOLIO_NOTION_DB_ID);

  SpreadsheetApp.getActiveSpreadsheet().toast('✅ Clarity Life cleaned up successfully', 'Complete', 5);
}

cleanUpClarityLife();
