import { NOTION_DATABASE_ID } from './constants';
import { createDataInNotion, getDataFromNotion, updateDataInNotion } from './notion';

function main() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('시트50');
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues(); // A: 종목, B: 현재가

  data.forEach(([symbol, price]) => {
    if (!symbol || !price) {
      return;
    }

    const result = getDataFromNotion(NOTION_DATABASE_ID, {
      filter: {
        property: '종목',
        rich_text: {
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
