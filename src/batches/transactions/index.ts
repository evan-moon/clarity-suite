import { isFullPage } from '@notionhq/client';
import { updateDataInNotion } from '../../notion/api';
import { queryNotionEmptyRatePages } from './utils';

export function syncCurrencyInTransactions(sheetName: string, notionDbId: string) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error(`시트를 찾을 수 없습니다: ${sheetName}`);

  const pages = queryNotionEmptyRatePages(notionDbId);
  if (pages.length === 0) return;

  pages.forEach((page, i) => {
    if (isFullPage(page) === false) {
      return;
    }

    const row = i + 2;

    const dateProperty = page.properties['날짜'];
    const fromProperty = page.properties['거래통화'];
    const toProperty = page.properties['대상통화'];

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

  pages.forEach((page, i) => {
    const row = i + 2;
    const rate = sheet.getRange(row, 4).getValue();
    if (rate !== '' && !isNaN(rate)) {
      updateDataInNotion(page.id, {
        properties: {
          '환율 (자동입력)': { number: rate },
        },
      });
    }
  });
}
