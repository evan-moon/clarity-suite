import { isFullPage } from '@notionhq/client';
import { updateDataInNotionBatch } from 'notion/api';
import { isFullPageWithId } from 'notion/utils';
import { t } from 'i18n';
import { queryNotionEmptyRatePocketbookPages } from './utils';

export function syncPiggyTransactionsCurrencies(sheetName: string, notionDbId: string, token: string) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);

  const pages = queryNotionEmptyRatePocketbookPages(notionDbId, token);
  if (pages.length === 0) return;

  pages.forEach((page, i) => {
    if (isFullPage(page) === false) {
      return;
    }

    const row = i + 2;

    const dateProperty = page.properties[t('date')];
    const fromProperty = page.properties[t('currency')];
    const toProperty = page.properties[t('accountCurrency')];

    if (dateProperty.type !== 'date' || fromProperty.type !== 'select' || toProperty.type !== 'formula') {
      return;
    }

    const date = dateProperty.date?.start;
    const fromSelect = fromProperty.select;
    const toFormula = toProperty.formula;
    const from = fromSelect ? fromSelect.name : '';
    const to = toFormula.type === 'string' ? toFormula.string ?? '' : '';

    const isSameCurrency = from === to;

    sheet.getRange(row, 1).setValue(date);
    sheet.getRange(row, 2).setValue(from);
    sheet.getRange(row, 3).setValue(to);
    sheet
      .getRange(row, 4)
      .setFormula(
        isSameCurrency ? '1.2' : `=iferror(index(googlefinance(B${row}&C${row},"price",A${row},A${row} + 2), 2, 2), "")`
      );
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
              [t('exchangeRate')]: { number: rate },
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
