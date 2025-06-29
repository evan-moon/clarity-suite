import { createNotionClient } from 'notion/api';
import { getGoogleFinanceQuery } from 'sheet';
import { CURRENCY_DATA } from './constants';
import { t } from 'i18n';
import { appsScriptProperties } from 'appsScriptProperties';
import { assertEnv } from 'asserts';

export const calcCurrencyData = (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, 환율이름: string) => {
  sheet.getRange(row, 1).setValue(환율이름);
  const currencyName = 환율이름.replace(/\//, '');

  CURRENCY_DATA.forEach(([, proprety], index) => {
    const column = index + 2;
    sheet.getRange(row, column).setValue(getGoogleFinanceQuery(`"CURRENCY:${currencyName}"`, proprety));
  });
};

export const getAllCurrencyPages = (notionDbId: string) => {
  assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

  const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
  return notion.getPages(notionDbId, {
    filter: {
      property: t('name'),
      title: {
        is_not_empty: true,
      },
    },
  });
};
