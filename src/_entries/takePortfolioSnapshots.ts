import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { takePortfolioSnapshots as _takePortfolioSnapshots } from 'services/portfolio';
import { assertEnv } from 'services/_shared/asserts';

function takePortfolioSnapshots() {
  const { PORTFOLIO_NOTION_DB_ID, PORTFOLIO_SNAPSHOT_NOTION_DB_ID } = appsScriptProperties;
  assertEnv('PORTFOLIO_NOTION_DB_ID', PORTFOLIO_NOTION_DB_ID);
  assertEnv('PORTFOLIO_SNAPSHOT_NOTION_DB_ID', PORTFOLIO_SNAPSHOT_NOTION_DB_ID);

  _takePortfolioSnapshots(PORTFOLIO_NOTION_DB_ID, PORTFOLIO_SNAPSHOT_NOTION_DB_ID);
}

takePortfolioSnapshots();
