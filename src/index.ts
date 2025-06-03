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

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues();

  Logger.log(`${TARGET_SHEET_NAME} 시트에서 종목 데이터를 불러왔어요.`);
  Logger.log(data);

  data.forEach(([티커, 종목명, 현재가, 전일종가, 변동폭, 연최고가, 연최저가, PE, EPS]) => {
    if (!티커) {
      return;
    }

    Logger.log(`${종목명} 업데이트를 시작합니다.`);

    const result = getDataFromNotion(NOTION_DATABASE_ID, {
      filter: {
        property: 'Ticker',
        title: {
          equals: 티커,
        },
      },
    });

    const propertiesPayload = {
      종목명: {
        rich_text: [
          {
            text: {
              content: 종목명,
            },
          },
        ],
      },
      현재가: {
        number: parseFloat(현재가),
      },
      전일종가: {
        number: parseFloat(전일종가),
      },
      변동: {
        number: parseFloat(변동폭) / 100,
      },
      '52주최고가': {
        number: parseFloat(연최고가),
      },
      '52주최저가': {
        number: parseFloat(연최저가),
      },
      PE: {
        number: parseFloat(PE),
      },
      EPS: {
        number: parseFloat(EPS),
      },
    };

    Logger.log('노션에서 해당 종목의 정보를 찾아왔어요.');
    Logger.log(propertiesPayload);

    if (result.results.length > 0) {
      const pageId = result.results[0].id;

      updateDataInNotion(pageId, {
        properties: propertiesPayload,
      });

      Logger.log(`${종목명} 종목 정보를 업데이트했어요.`);
    } else {
      createDataInNotion(NOTION_DATABASE_ID, {
        Ticker: {
          title: [{ text: { content: 티커 } }],
        },
        ...propertiesPayload,
      });

      Logger.log(`${종목명} 종목 정보를 새로 추가했어요.`);
    }
  });
}
