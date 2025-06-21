type ScriptPropertyKeys =
  | 'NOTION_SECRET'
  | 'CURRENCIES_NOTION_DB_ID'
  | 'STOCKS_NOTION_DB_ID'
  | 'TRANSACTION_NOTION_DB_ID';
type DatabasePropertyKeys = Exclude<ScriptPropertyKeys, 'NOTION_SECRET'>;

type PropertyKeyInSpreadSheet = string;
export const SCRIPT_PROPERTIES_MAP: Record<PropertyKeyInSpreadSheet, ScriptPropertyKeys> = {
  'Notion Access Key': 'NOTION_SECRET',
  'Currency DB Name': 'CURRENCIES_NOTION_DB_ID',
  'Stock DB Name': 'STOCKS_NOTION_DB_ID',
  'Transaction DB': 'TRANSACTION_NOTION_DB_ID',
};

export const DATABASE_PROPERTIES: DatabasePropertyKeys[] = [
  'CURRENCIES_NOTION_DB_ID',
  'STOCKS_NOTION_DB_ID',
  'TRANSACTION_NOTION_DB_ID',
];
