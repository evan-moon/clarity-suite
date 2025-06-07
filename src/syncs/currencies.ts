import { createDataInNotion, getDataFromNotion, updateDataInNotion } from '../notion';
import { getSheet } from '../sheet';

export function syncCurrencies(sheetName: string, notionDbId: string) {
  const sheet = getSheet(sheetName);
  if (sheet == null) {
    Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
    return;
  }

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 10).getValues();

  Logger.log(`${sheetName} 시트에서 환율 데이터를 불러왔어요.`);
  Logger.log(data);

  data.forEach(([기준통화, 대상통화, 환율]) => {
    if (환율 == null) {
      return;
    }

    const 환율명 = `${기준통화}/${대상통화}`;

    Logger.log(`${환율명} 업데이트를 시작합니다.`);

    const result = getDataFromNotion(notionDbId, {
      filter: {
        property: '이름',
        title: {
          equals: 환율명,
        },
      },
    });

    const propertiesPayload = {
      기준통화: {
        rich_text: [
          {
            text: {
              content: 기준통화,
            },
          },
        ],
      },
      대상통화: {
        rich_text: [
          {
            text: {
              content: 대상통화,
            },
          },
        ],
      },
      환율: {
        number: parseFloat(환율),
      },
    };

    Logger.log('노션에서 해당 환율의 정보를 찾아왔어요.');
    Logger.log(propertiesPayload);

    if (result.results.length > 0) {
      const pageId = result.results[0].id;

      updateDataInNotion(pageId, {
        properties: propertiesPayload,
      });

      Logger.log(`${환율명} 종목 정보를 업데이트했어요.`);
    } else {
      createDataInNotion(notionDbId, {
        이름: {
          title: [{ text: { content: 환율명 } }],
        },
        ...propertiesPayload,
      });

      Logger.log(`${환율명} 종목 정보를 새로 추가했어요.`);
    }
  });
}
