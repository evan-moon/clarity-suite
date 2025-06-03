import { NOTION_TOKEN } from './constants';

const NOTION_REQUEST_HEADER = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

export function getDataFromNotion<T>(databaseId: string, data: T) {
  const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

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
      ...data,
    }),
  });

  return JSON.parse(result.getContentText());
}
