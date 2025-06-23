import { getSheet } from 'sheet';
import { STOCK_DATA } from './constants';
import { calcStockData, getAllStockPages } from './utils';
import { syncBatch } from 'services/_shared/sync';
import type { BatchData } from 'services/_shared/types';
import { t } from 'i18n';

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

export function syncRealtimeStocks(sheetName: string, notionDbId: string, token: string) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  syncBatch<StockData>(
    sheetName,
    notionDbId,
    {
      getPages: notionDbId => getAllStockPages(notionDbId, token),
      calcData: calcStockData,
      getDataFromSheet: (sheet, row, name) => {
        const result = sheet.getRange(row, 1, sheet.getLastRow() - 1, STOCK_DATA.length + 1).getValues();
        const data = result.find(row => row[0] === name);
        if (data == null) return null;

        return {
          properties: {
            [t('ticker')]: {
              title: [{ text: { content: data[0] } }],
            },
            [t('stockName')]: {
              rich_text: [
                {
                  text: {
                    content: data[1],
                  },
                },
              ],
            },
            [t('currentPrice')]: {
              number: parseFloat(data[2]),
            },
            [t('previousClose')]: {
              number: parseFloat(data[3]),
            },
            [t('change')]: {
              number: parseFloat(data[4]) / 100,
            },
            [t('yearHigh')]: {
              number: parseFloat(data[5]),
            },
            [t('yearLow')]: {
              number: parseFloat(data[6]),
            },
            [t('pe')]: {
              number: parseFloat(data[7]),
            },
            [t('eps')]: {
              number: parseFloat(data[8]),
            },
            [t('dividendYield')]: {
              number: parseFloat(data[9]),
            },
          },
        };
      },
      getDataColumnCount: STOCK_DATA.length + 1,
      titlePropertyName: t('ticker'),
    },
    token
  );
}
