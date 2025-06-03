import { NOTION_DATABASE_ID, TARGET_SHEET_NAME } from './constants';
import { createDataInNotion, getDataFromNotion, updateDataInNotion } from './notion';
import { getSheet } from './sheet';

function main() {
  if (TARGET_SHEET_NAME == null) {
    Logger.log(`Apps Script 속성에 대상 시트 이름을 등록해주세요.`);
    return;
  }

  const sheet = getSheet(TARGET_SHEET_NAME);
  if (sheet == null) {
    Logger.log(`${TARGET_SHEET_NAME} 시트가 존재하지 않습니다.`);
    return;
  }

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues(); // A: 종목, B: 현재가

  data.forEach(([symbol, price]) => {
    if (!symbol || !price) {
      return;
    }

    const result = getDataFromNotion(NOTION_DATABASE_ID, {
      filter: {
        property: '종목',
        title: {
          equals: symbol,
        },
      },
    });

    if (result.results.length > 0) {
      const pageId = result.results[0].id;

      updateDataInNotion(pageId, {
        properties: {
          현재가: {
            number: parseFloat(price),
          },
        },
      });
    } else {
      createDataInNotion(NOTION_DATABASE_ID, {
        종목: {
          title: [{ text: { content: symbol } }],
        },
        현재가: {
          number: parseFloat(price),
        },
      });
    }
  });
}
