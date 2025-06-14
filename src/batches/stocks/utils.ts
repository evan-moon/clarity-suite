import { getDataFromNotion, updateDataInNotion } from '../../notion/api';
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

export const updateNotionStockPrice = (
  pageId: string,
  { 티커, 종목명, 현재가, 전일종가, 변동폭, 연최고가, 연최저가, 배당률, PE, EPS }: StockPriceData
) =>
  updateDataInNotion(pageId, {
    properties: {
      Ticker: {
        title: [{ text: { content: 티커 } }],
      },
      종목명: {
        rich_text: [
          {
            text: {
              content: 종목명,
            },
          },
        ],
      },
      현재가: {
        number: 현재가,
      },
      전일종가: {
        number: 전일종가,
      },
      변동: {
        number: 변동폭 / 100,
      },
      '52주최고가': {
        number: 연최고가,
      },
      '52주최저가': {
        number: 연최저가,
      },
      배당률: {
        number: 배당률 / 100,
      },
      PE: {
        number: PE,
      },
      EPS: {
        number: EPS,
      },
    },
  });

export const getAllStockPages = (notionDbId: string) =>
  getDataFromNotion(notionDbId, {
    filter: {
      property: 'Ticker',
      title: {
        is_not_empty: true,
      },
    },
  });
