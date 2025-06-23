import { getSheet } from 'sheet';
import { CURRENCY_DATA } from './constants';
import { calcCurrencyData, getAllCurrencyPages } from './utils';
import { syncBatch } from 'core/common/sync';
import type { BatchData } from 'core/common/types';
import { t } from 'i18n';

interface CurrencyData extends BatchData {
  환율이름: string;
  기준통화: string;
  대상통화: string;
  환율: number;
}

export function syncCurrencies(sheetName: string, notionDbId: string, token: string) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  syncBatch<CurrencyData>(
    sheetName,
    notionDbId,
    {
      getPages: notionDbId => getAllCurrencyPages(notionDbId, token),
      calcData: calcCurrencyData,
      getDataFromSheet: (sheet, row, name) => {
        const result = sheet.getRange(row, 1, sheet.getLastRow() - 1, CURRENCY_DATA.length + 3).getValues();
        const data = result.find(row => row[0] === name);
        if (data == null) return null;

        return {
          properties: {
            [t('name')]: {
              title: [{ text: { content: data[0] } }],
            },
            [t('baseCurrency')]: {
              rich_text: [
                {
                  text: {
                    content: data[1],
                  },
                },
              ],
            },
            [t('targetCurrency')]: {
              rich_text: [
                {
                  text: {
                    content: data[2],
                  },
                },
              ],
            },
            [t('exchangeRate')]: {
              number: parseFloat(data[3]),
            },
          },
        };
      },
      getDataColumnCount: CURRENCY_DATA.length + 3,
      titlePropertyName: t('name'),
    },
    token
  );
}
