import { getTitleText } from '../../notion/utils';
import { getSheet } from '../../sheet';
import { STOCK_DATA } from './constants';
import { calcStockData, getNotionEmptyPricePages, updateNotionStockPrice } from './utils';
import { isFullPage } from '@notionhq/client';

export function syncStocks(sheetName: string, notionDbId: string) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  const notionPages = getNotionEmptyPricePages(notionDbId);
  notionPages.results.forEach((page, index) => {
    if (isFullPage(page)) {
      const ticker = getTitleText(page.properties['Ticker']);
      calcStockData(sheet, index + 1, ticker);
      Logger.log(`${ticker} 정보가 시트에 입력되었어요.`);
    }
  });

  SpreadsheetApp.flush();

  Logger.log(`모든 종목 정보가 시트에서 계산되었어요.`);

  notionPages.results.forEach((page, index) => {
    if (isFullPage(page)) {
      const result = sheet.getRange(index + 1, 1, sheet.getLastRow() - 1, STOCK_DATA.length + 1).getValues();
      const data = result.find(row => row[0] === getTitleText(page.properties['Ticker']));
      Logger.log(`${getTitleText(page.properties['Ticker'])}의 계산된 데이터를 가져왔어요`);

      if (data) {
        updateNotionStockPrice(page.id, {
          티커: data[0],
          종목명: data[1],
          현재가: parseFloat(data[2]),
          전일종가: parseFloat(data[3]),
          변동폭: parseFloat(data[4]),
          연최고가: parseFloat(data[5]),
          연최저가: parseFloat(data[6]),
          배당률: 0, // 배당률 정보는 현재 시트에 없음
          PE: parseFloat(data[7]),
          EPS: parseFloat(data[8]),
        });
      }
    }
  });
}
