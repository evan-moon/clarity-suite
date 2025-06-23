/**
 * Apps Script의 프로젝트 설정 > 스크립트 속성에 등록된 값과 이 값은 일치해야합니다.
 */
export const appsScriptProperties = {
  STOCKS_SHEET_NAME: 'Stocks',
  CURRENCIES_SHEET_NAME: 'Currencies',
  STOCK_TRANSACTION_CURRENCIES_SHEET_NAME: 'Stock Transaction Currencies',
  POCKETBOOK_TRANSACTION_SHEET_NAME: 'Pocketbook Transaction Currencies',
  NOTION_SECRET: PropertiesService.getScriptProperties().getProperty('NOTION_SECRET') ?? 'INVALID_SECRET',
  STOCKS_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('STOCKS_NOTION_DB_ID'),
  CURRENCIES_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('CURRENCIES_NOTION_DB_ID'),
  STOCK_TRANSACTION_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('STOCK_TRANSACTION_NOTION_DB_ID'),
  POCKETBOOK_TRANSACTION_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty(
    'POCKETBOOK_TRANSACTION_NOTION_DB_ID'
  ),
};
