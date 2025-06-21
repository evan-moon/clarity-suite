import { getDataFromNotion } from 'notion/api';
import { getGoogleFinanceQuery } from 'sheet';
import { CURRENCY_DATA } from './constants';
import { t } from 'i18n';

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

export const getAllCurrencyPages = (notionDbId: string, token: string) =>
  getDataFromNotion(
    notionDbId,
    {
      filter: {
        property: t('name'),
        title: {
          is_not_empty: true,
        },
      },
    },
    token
  );
