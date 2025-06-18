/**
 * Apps Script의 프로젝트 설정 > 스크립트 속성에 등록된 값과 이 값은 일치해야합니다.
 */
export const appsScriptProperties = {
  STOCKS_SHEET_NAME: 'Stocks',
  CURRENCIES_SHEET_NAME: 'Currencies',
  TRANSACTION_CURRENCIES_SHEET_NAME: 'Transaction Currencies',
  NOTION_SECRET: PropertiesService.getScriptProperties().getProperty('NOTION_SECRET'),
  STOCKS_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('STOCKS_NOTION_DB_ID'),
  CURRENCIES_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('CURRENCIES_NOTION_DB_ID'),
  TRANSACTION_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('TRANSACTION_NOTION_DB_ID'),
} as const;
