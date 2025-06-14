import { isFullPage } from '@notionhq/client';
import { getSheet } from '../../sheet';
import { getTitleText } from '../../notion/utils';
import type { BatchConfig, BatchData } from './types';

export function syncBatch<T extends BatchData>(sheetName: string, notionDbId: string, config: BatchConfig<T>) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  const allPages = config.getPages(notionDbId);
  const processedItems = new Set<string>();

  allPages.results.forEach((page, index) => {
    if (isFullPage(page) === false) {
      return;
    }

    const name = getTitleText(page.properties[config.titlePropertyName]);
    if (!processedItems.has(name)) {
      config.calcData(sheet, index + 1, name);
      processedItems.add(name);
      Logger.log(`${name} 정보가 시트에 입력되었어요.`);
    }
  });

  SpreadsheetApp.flush();
  Logger.log(`모든 정보가 시트에서 계산되었어요.`);

  allPages.results.forEach((page, index) => {
    if (isFullPage(page) === false) {
      return;
    }

    const name = getTitleText(page.properties[config.titlePropertyName]);
    const data = config.getDataFromSheet(sheet, index + 1, name);
    Logger.log(`${name}의 계산된 데이터를 가져왔어요`);

    if (data != null) {
      config.updateNotion(page.id, data);
    }
  });
}
