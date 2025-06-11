import { getDataFromNotion, updateDataInNotion } from '../../notion/api';
import { getGoogleFinanceQuery } from '../../sheet';
import { CURRENCY_DATA } from './constants';
import { CurrencyData } from './types';

export const calcCurrencyData = (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, 환율이름: string) => {
  sheet.getRange(row, 1).setValue(환율이름);
  const [기준통화, 대상통화] = 환율이름.split('/');
  sheet.getRange(row, 2).setValue(기준통화);
  sheet.getRange(row, 3).setValue(대상통화);

  CURRENCY_DATA.forEach(([, proprety], index) => {
    const column = index + 4;
    sheet.getRange(row, column).setValue(getGoogleFinanceQuery(`"CURRENCY:"&$B${row}&C${row}`, proprety));
  });
};

export const getNotionEmptyCurrencyPages = (notionDbId: string) =>
  getDataFromNotion(notionDbId, {
    filter: {
      property: '환율',
      number: { is_empty: true },
    },
  });

export const updateNotionCurrency = (pageId: string, { 환율이름, 기준통화, 대상통화, 환율 }: CurrencyData) =>
  updateDataInNotion(pageId, {
    properties: {
      이름: {
        title: [{ text: { content: 환율이름 } }],
      },
      기준통화: {
        rich_text: [
          {
            text: {
              content: 기준통화,
            },
          },
        ],
      },
      대상통화: {
        rich_text: [
          {
            text: {
              content: 대상통화,
            },
          },
        ],
      },
      환율: {
        number: 환율,
      },
    },
  });
