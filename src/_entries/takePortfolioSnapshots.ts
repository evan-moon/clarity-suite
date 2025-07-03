import { appsScriptProperties } from 'appsScriptProperties';
import { takePortfolioSnapshots as _takePortfolioSnapshots } from 'services/portfolio';
import { assertEnv } from 'asserts';

function takePortfolioSnapshots() {
  const { PORTFOLIO_NOTION_DB_ID, PORTFOLIO_SNAPSHOT_NOTION_DB_ID } = appsScriptProperties;
  assertEnv('PORTFOLIO_NOTION_DB_ID', PORTFOLIO_NOTION_DB_ID);
  assertEnv('PORTFOLIO_SNAPSHOT_NOTION_DB_ID', PORTFOLIO_SNAPSHOT_NOTION_DB_ID);

  _takePortfolioSnapshots(PORTFOLIO_NOTION_DB_ID, PORTFOLIO_SNAPSHOT_NOTION_DB_ID);
}

takePortfolioSnapshots();
