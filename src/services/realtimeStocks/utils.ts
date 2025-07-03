import { createNotionClient } from 'notion/api';
import { getGoogleFinanceQuery } from 'sheet';
import { STOCK_DATA } from './constants';
import { appsScriptProperties } from 'appsScriptProperties';
import { assertEnv } from 'asserts';

export const calcStockData = (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, ticker: string) => {
  sheet.getRange(row, 1).setValue(ticker);

  const rowRef = `$A${row}`;
  STOCK_DATA.forEach(([, proprety], index) => {
    const column = index + 2;

    sheet.getRange(row, column).setValue(getGoogleFinanceQuery(rowRef, proprety));
  });
};

export const getAllStockPages = (notionDbId: string) => {
  assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

  const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
  return notion.getPages(notionDbId, {
    filter: {
      property: 'Ticker',
      title: {
        is_not_empty: true,
      },
    },
  });
};
