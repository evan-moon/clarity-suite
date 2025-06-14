import { getDataFromNotion } from '../../notion/api';
import { getGoogleFinanceQuery } from '../../sheet';
import { STOCK_DATA } from './constants';
import type { StockPriceData } from './types';

export const calcStockData = (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, ticker: string) => {
  sheet.getRange(row, 1).setValue(ticker);
  STOCK_DATA.forEach(([, proprety], index) => {
    const column = index + 2;

    sheet.getRange(row, column).setValue(getGoogleFinanceQuery(`$A${row}`, proprety));
  });
};

export const getAllStockPages = (notionDbId: string) =>
  getDataFromNotion(notionDbId, {
    filter: {
      property: 'Ticker',
      title: {
        is_not_empty: true,
      },
    },
  });
