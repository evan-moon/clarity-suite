import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { takePortfolioSnapshots as _takePortfolioSnapshots } from 'services/portfolio';
import { assert } from '@clarity-suite/utils';

function takePortfolioSnapshots() {
	const { PORTFOLIO_NOTION_DB_ID, PORTFOLIO_SNAPSHOT_NOTION_DB_ID } =
		appsScriptProperties;
	assert(PORTFOLIO_NOTION_DB_ID, 'The script property "PORTFOLIO_NOTION_DB_ID" is not set. Please check Project Settings > Script properties.');
	assert(PORTFOLIO_SNAPSHOT_NOTION_DB_ID, 'The script property "PORTFOLIO_SNAPSHOT_NOTION_DB_ID" is not set. Please check Project Settings > Script properties.');

	_takePortfolioSnapshots(
		PORTFOLIO_NOTION_DB_ID,
		PORTFOLIO_SNAPSHOT_NOTION_DB_ID,
	);
}

takePortfolioSnapshots();
