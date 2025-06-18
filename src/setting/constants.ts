type ScriptPropertyKeys =
  | 'NOTION_SECRET'
  | 'CURRENCIES_NOTION_DB_ID'
  | 'STOCKS_NOTION_DB_ID'
  | 'TRANSACTION_NOTION_DB_ID';
type DatabasePropertyKeys = Exclude<ScriptPropertyKeys, 'NOTION_SECRET'>;

export const 스크립트속성: Record<string, ScriptPropertyKeys> = {
  'Notion 토큰': 'NOTION_SECRET',
  '실시간 환율 DB 이름': 'CURRENCIES_NOTION_DB_ID',
  '종목 현재가 DB 이름': 'STOCKS_NOTION_DB_ID',
  '거래내역 DB 이름': 'TRANSACTION_NOTION_DB_ID',
};

export const DATABASE_PROPERTIES: DatabasePropertyKeys[] = [
  'CURRENCIES_NOTION_DB_ID',
  'STOCKS_NOTION_DB_ID',
  'TRANSACTION_NOTION_DB_ID',
];
