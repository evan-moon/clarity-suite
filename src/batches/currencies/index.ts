import { getSheet } from '../../sheet';
import { CURRENCY_DATA } from './constants';
import { calcCurrencyData, getAllCurrencyPages } from './utils';
import { syncBatch } from '../common/sync';
import type { BatchData } from '../common/types';

interface CurrencyData extends BatchData {
  환율이름: string;
  기준통화: string;
  대상통화: string;
  환율: number;
}

export function syncCurrencies(sheetName: string, notionDbId: string) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  syncBatch<CurrencyData>(sheetName, notionDbId, {
    getPages: getAllCurrencyPages,
    calcData: calcCurrencyData,
    getDataFromSheet: (sheet, row, name) => {
      const result = sheet.getRange(row, 1, sheet.getLastRow() - 1, CURRENCY_DATA.length + 3).getValues();
      const data = result.find(row => row[0] === name);
      if (data == null) return null;

      return {
        properties: {
          이름: {
            title: [{ text: { content: data[0] } }],
          },
          기준통화: {
            rich_text: [
              {
                text: {
                  content: data[1],
                },
              },
            ],
          },
          대상통화: {
            rich_text: [
              {
                text: {
                  content: data[2],
                },
              },
            ],
          },
          환율: {
            number: parseFloat(data[3]),
          },
        },
      };
    },
    getDataColumnCount: CURRENCY_DATA.length + 3,
    titlePropertyName: '이름',
  });
}
