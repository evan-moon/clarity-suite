export type ScriptPropertyKeys =
  | 'NOTION_SECRET'
  | 'CURRENCIES_NOTION_DB_ID'
  | 'STOCKS_NOTION_DB_ID'
  | 'STOCK_TRANSACTION_NOTION_DB_ID'
  | 'PIGGY_TRANSACTION_NOTION_DB_ID'
  | 'ACCOUNT_HUB_NOTION_DB_ID'
  | 'ACCOUNT_SNAPSHOT_NOTION_DB_ID'
  | 'PORTFOLIO_NOTION_DB_ID';
type DatabasePropertyKeys = Exclude<ScriptPropertyKeys, 'NOTION_SECRET'>;

type PropertyKeyInSpreadSheet = string;
export const SCRIPT_PROPERTIES_MAP: Record<PropertyKeyInSpreadSheet, ScriptPropertyKeys> = {
  'Notion Integration Secret': 'NOTION_SECRET',
  'Currency DB Name': 'CURRENCIES_NOTION_DB_ID',
  'Stock DB Name': 'STOCKS_NOTION_DB_ID',
  'Stock Transaction DB': 'STOCK_TRANSACTION_NOTION_DB_ID',
  'Piggy Transaction DB': 'PIGGY_TRANSACTION_NOTION_DB_ID',
  'Account Hub DB': 'ACCOUNT_HUB_NOTION_DB_ID',
  'Account Snapshot DB': 'ACCOUNT_SNAPSHOT_NOTION_DB_ID',
  'Portfolio DB': 'PORTFOLIO_NOTION_DB_ID',
};

export const DATABASE_PROPERTIES: DatabasePropertyKeys[] = [
  'CURRENCIES_NOTION_DB_ID',
  'STOCKS_NOTION_DB_ID',
  'STOCK_TRANSACTION_NOTION_DB_ID',
  'PIGGY_TRANSACTION_NOTION_DB_ID',
  'ACCOUNT_HUB_NOTION_DB_ID',
  'ACCOUNT_SNAPSHOT_NOTION_DB_ID',
  'PORTFOLIO_NOTION_DB_ID',
];
