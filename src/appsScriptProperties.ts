/**
 * Apps Script의 프로젝트 설정 > 스크립트 속성에 등록된 값과 이 값은 일치해야합니다.
 */
export const appsScriptProperties = {
  NOTION_SECRET: PropertiesService.getScriptProperties().getProperty('NOTION_SECRET'),
  STOCKS_SHEET_NAME: PropertiesService.getScriptProperties().getProperty('STOCKS_SHEET_NAME'),
  STOCKS_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('STOCKS_NOTION_DB_ID'),
  CURRENCIES_SHEET_NAME: PropertiesService.getScriptProperties().getProperty('CURRENCIES_SHEET_NAME'),
  CURRENCIES_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('CURRENCIES_NOTION_DB_ID'),
} as const;
