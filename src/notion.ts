import { appsScriptProperties } from './appsScriptProperties';

const NOTION_REQUEST_HEADER = {
  Authorization: `Bearer ${appsScriptProperties.NOTION_SECRET}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

export function getDataFromNotion<T>(databaseId: string, data: T) {
  const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;
  Logger.log(queryUrl);

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'post',
    headers: NOTION_REQUEST_HEADER,
    payload: JSON.stringify(data),
  });

  return JSON.parse(result.getContentText());
}

export function updateDataInNotion<T>(pageId: string, data: T) {
  const queryUrl = `https://api.notion.com/v1/pages/${pageId}`;

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'patch',
    headers: NOTION_REQUEST_HEADER,
    payload: JSON.stringify(data),
  });

  return JSON.parse(result.getContentText());
}

export function createDataInNotion<T>(databaseId: string, data: T) {
  const queryUrl = `https://api.notion.com/v1/pages`;

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'post',
    headers: NOTION_REQUEST_HEADER,
    payload: JSON.stringify({
      parent: { database_id: databaseId },
      properties: { ...data },
    }),
  });

  return JSON.parse(result.getContentText());
}
