export type ScriptPropertyKeys =
	| 'NOTION_SECRET'
	| 'CURRENCIES_NOTION_DB_ID'
	| 'STOCKS_NOTION_DB_ID'
	| 'STOCK_TRANSACTION_NOTION_DB_ID'
	| 'PORTFOLIO_NOTION_DB_ID'
	| 'PORTFOLIO_SNAPSHOT_NOTION_DB_ID'
	| 'ASSETS_NOTION_DB_ID'
	| 'ASSETS_SUMMARY_NOTION_DB_ID'
	| 'CASH_FLOW_NOTION_DB_ID'
	| 'CASH_FLOW_SUMMARY_NOTION_DB_ID';

export type DatabasePropertyKeys = Exclude<ScriptPropertyKeys, 'NOTION_SECRET'>;
export type PropertyKeyInSpreadSheet = string;
