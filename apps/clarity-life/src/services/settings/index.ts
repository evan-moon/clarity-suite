import type {
	PropertyKeyInSpreadSheet,
	ScriptPropertyKeys,
} from '@clarity-suite/settings';
import { applySettingsFromNotionVariables } from '@clarity-suite/settings';
import type { DatabasePropertyKeys } from './types';

const SCRIPT_PROPERTIES_MAP: Record<
	PropertyKeyInSpreadSheet,
	ScriptPropertyKeys
> = {
	'Notion Integration Secret': 'NOTION_SECRET',
	'Currency DB': 'CURRENCIES_NOTION_DB_ID',
	'Stock DB': 'STOCKS_NOTION_DB_ID',
	'Tradebook DB': 'STOCK_TRANSACTION_NOTION_DB_ID',
	'Portfolio DB': 'PORTFOLIO_NOTION_DB_ID',
	'Portfolio Snapshot DB': 'PORTFOLIO_SNAPSHOT_NOTION_DB_ID',
};

const DATABASE_PROPERTIES: DatabasePropertyKeys[] = [
	'CURRENCIES_NOTION_DB_ID',
	'STOCKS_NOTION_DB_ID',
	'STOCK_TRANSACTION_NOTION_DB_ID',
	'PORTFOLIO_NOTION_DB_ID',
	'PORTFOLIO_SNAPSHOT_NOTION_DB_ID',
];

export function applySettingsFromNotionVariablesForClarityLife() {
	applySettingsFromNotionVariables({
		SCRIPT_PROPERTIES_MAP,
		DATABASE_PROPERTIES,
	});
}
