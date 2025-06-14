import { getSheet } from '../../sheet';
import { STOCK_DATA } from './constants';
import { calcStockData, getAllStockPages } from './utils';
import { syncBatch } from '../common/sync';
import type { BatchData } from '../common/types';

interface StockData extends BatchData {
  티커: string;
  종목명: string;
  현재가: number;
  전일종가: number;
  변동폭: number;
  연최고가: number;
  연최저가: number;
  PE: number;
  EPS: number;
  배당률: number;
}

export function syncStocks(sheetName: string, notionDbId: string) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  syncBatch<StockData>(sheetName, notionDbId, {
    getPages: getAllStockPages,
    calcData: calcStockData,
    getDataFromSheet: (sheet, row, name) => {
      const result = sheet.getRange(row, 1, sheet.getLastRow() - 1, STOCK_DATA.length + 1).getValues();
      const data = result.find(row => row[0] === name);
      if (data == null) return null;

      return {
        properties: {
          Ticker: {
            title: [{ text: { content: data[0] } }],
          },
          종목명: {
            rich_text: [
              {
                text: {
                  content: data[1],
                },
              },
            ],
          },
          현재가: {
            number: parseFloat(data[2]),
          },
          전일종가: {
            number: parseFloat(data[3]),
          },
          변동: {
            number: parseFloat(data[4]) / 100,
          },
          '52주최고가': {
            number: parseFloat(data[5]),
          },
          '52주최저가': {
            number: parseFloat(data[6]),
          },
          PE: {
            number: parseFloat(data[7]),
          },
          EPS: {
            number: parseFloat(data[8]),
          },
          배당률: {
            number: parseFloat(data[9]),
          },
        },
      };
    },
    getDataColumnCount: STOCK_DATA.length + 1,
    titlePropertyName: 'Ticker',
  });
}
