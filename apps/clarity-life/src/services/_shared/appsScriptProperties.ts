import { ScriptPropertyKeys } from 'services/settings/constants';

/**
 * Apps Script의 프로젝트 설정 > 스크립트 속성에 등록된 값과 이 값은 일치해야합니다.
 */
type SheetNameProperties =
  | 'STOCKS_SHEET_NAME'
  | 'CURRENCIES_SHEET_NAME'
  | 'STOCK_TRANSACTION_CURRENCIES_SHEET_NAME'
  | 'PIGGY_TRANSACTION_SHEET_NAME';

export const appsScriptProperties: Record<ScriptPropertyKeys | SheetNameProperties, string | null> = {
  STOCKS_SHEET_NAME: 'Stocks',
  CURRENCIES_SHEET_NAME: 'Currencies',
  STOCK_TRANSACTION_CURRENCIES_SHEET_NAME: 'Stock Transaction Currencies',
  PIGGY_TRANSACTION_SHEET_NAME: 'Piggy Transaction Currencies',
  NOTION_SECRET: PropertiesService.getScriptProperties().getProperty('NOTION_SECRET') ?? 'INVALID_SECRET',
  STOCKS_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('STOCKS_NOTION_DB_ID'),
  CURRENCIES_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('CURRENCIES_NOTION_DB_ID'),
  STOCK_TRANSACTION_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('STOCK_TRANSACTION_NOTION_DB_ID'),
  PIGGY_TRANSACTION_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('PIGGY_TRANSACTION_NOTION_DB_ID'),
  ACCOUNT_HUB_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('ACCOUNT_HUB_NOTION_DB_ID'),
  ACCOUNT_SNAPSHOT_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('ACCOUNT_SNAPSHOT_NOTION_DB_ID'),
  PORTFOLIO_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty('PORTFOLIO_NOTION_DB_ID'),
  PORTFOLIO_SNAPSHOT_NOTION_DB_ID: PropertiesService.getScriptProperties().getProperty(
    'PORTFOLIO_SNAPSHOT_NOTION_DB_ID'
  ),
};

const isValidSheet = (sheetName: string) => SpreadsheetApp.getActiveSpreadsheet().getName().includes(sheetName);
export const isClarityLife = () => isValidSheet('Clarity Life');
export const isClarityCreatorKit = () => isValidSheet('Clarity Creator Kit');
