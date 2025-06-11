import { isFullPage } from '@notionhq/client';
import { getSheet } from '../../sheet';
import { getNotionEmptyPricePages } from '../stocks/utils';
import { getTitleText } from '../../notion/utils';
import { calcCurrencyData, getNotionEmptyCurrencyPages, updateNotionCurrency } from './utils';
import { CURRENCY_DATA } from './constants';

export function syncCurrencies(sheetName: string, notionDbId: string) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  const notionPages = getNotionEmptyCurrencyPages(notionDbId);
  notionPages.results.forEach((page, index) => {
    if (isFullPage(page) === false) {
      return;
    }

    const 환율이름 = getTitleText(page.properties['이름']);
    calcCurrencyData(sheet, index + 1, 환율이름);
    Logger.log(`${환율이름} 정보가 시트에 입력되었어요.`);
  });

  SpreadsheetApp.flush();
  Logger.log(`모든 환율 정보가 시트에서 계산되었어요.`);

  notionPages.results.forEach((page, index) => {
    if (isFullPage(page) === false) {
      return;
    }

    const result = sheet.getRange(index + 1, 1, sheet.getLastRow() - 1, CURRENCY_DATA.length + 3).getValues();
    const data = result.find(row => row[0] === getTitleText(page.properties['이름']));
    Logger.log(`${getTitleText(page.properties['이름'])}의 계산된 데이터를 가져왔어요`);

    if (data != null) {
      updateNotionCurrency(page.id, {
        환율이름: data[0],
        기준통화: data[1],
        대상통화: data[2],
        환율: parseFloat(data[3]),
      });
    }
  });
}
