import { isFullPage } from '@notionhq/client';
import { updateDataInNotionBatch } from 'notion/api';
import { queryNotionEmptyRatePages } from './utils';
import { isFullPageWithId } from 'notion/utils';
import { t } from 'i18n';

export function syncCurrencyInTransactions(sheetName: string, notionDbId: string, token: string) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);

  const pages = queryNotionEmptyRatePages(notionDbId, token);
  if (pages.length === 0) return;

  pages.forEach((page, i) => {
    if (isFullPage(page) === false) {
      return;
    }

    const row = i + 2;

    const dateProperty = page.properties[t('date')];
    const fromProperty = page.properties[t('transactionCurrency')];
    const toProperty = page.properties[t('transactionTargetCurrency')];

    if (dateProperty.type !== 'date' || fromProperty.type !== 'select' || toProperty.type !== 'select') {
      return;
    }

    const date = dateProperty.date?.start;
    const fromSelect = fromProperty.select;
    const toSelect = toProperty.select;
    const from = fromSelect ? fromSelect.name : '';
    const to = toSelect ? toSelect.name : '';

    const isUSD = from === 'USD' && to === 'USD';

    sheet.getRange(row, 1).setValue(date);
    sheet.getRange(row, 2).setValue(from);
    sheet.getRange(row, 3).setValue(to);
    sheet
      .getRange(row, 4)
      .setFormula(isUSD ? '1' : `=iferror(index(googlefinance(B${row}&C${row},"price",A${row},A${row}), 2, 2), "")`);
  });

  SpreadsheetApp.flush();

  const updates = pages
    .filter(isFullPageWithId)
    .map((page, i) => {
      const row = i + 2;
      const rate = sheet.getRange(row, 4).getValue();
      if (rate !== '' && !isNaN(rate)) {
        return {
          pageId: page.id,
          data: {
            properties: {
              [t('exchangeRateAuto')]: { number: rate },
            },
          },
        };
      }
      return null;
    })
    .filter((update): update is NonNullable<typeof update> => update != null);

  if (updates.length > 0) {
    updateDataInNotionBatch(updates, token);
    Logger.log(`${updates.length}개의 환율이 노션에 업데이트되었어요.`);
  }
}
