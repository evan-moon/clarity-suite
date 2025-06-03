import { NOTION_TOKEN } from './constants';

export function getDataFromNotion<T>(databaseId: string, data: T) {
  const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(data),
  });

  return JSON.parse(result.getContentText());
}

export function updateDataInNotion<T>(pageId: string, data: T) {
  const queryUrl = `https://api.notion.com/v1/pages/${pageId}`;

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'patch',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(data),
  });

  return JSON.parse(result.getContentText());
}

export function createDataInNotion<T>(databaseId: string, data: T) {
  const queryUrl = `https://api.notion.com/v1/pages`;

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({
      parent: { database_id: databaseId },
      ...data,
    }),
  });

  return JSON.parse(result.getContentText());
}
