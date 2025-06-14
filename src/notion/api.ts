import { appsScriptProperties } from '../appsScriptProperties';
import {
  PageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

const NOTION_REQUEST_HEADER = {
  Authorization: `Bearer ${appsScriptProperties.NOTION_SECRET}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

export function getDataFromNotion(
  databaseId: string,
  data: Omit<QueryDatabaseParameters, 'database_id'>
): { results: PageObjectResponse[] } {
  const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;
  Logger.log(queryUrl);

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'post',
    headers: NOTION_REQUEST_HEADER,
    payload: JSON.stringify(data),
  });

  return JSON.parse(result.getContentText());
}

export function updateDataInNotion<Payload = any>(pageId: string, data: Payload) {
  const queryUrl = `https://api.notion.com/v1/pages/${pageId}`;

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'patch',
    headers: NOTION_REQUEST_HEADER,
    payload: JSON.stringify(data),
  });

  return JSON.parse(result.getContentText());
}

export function updateDataInNotionBatch<Payload = any>(updates: { pageId: string; data: Payload }[]) {
  if (updates.length === 0) return [];

  const requests = updates.map(({ pageId, data }) => ({
    url: `https://api.notion.com/v1/pages/${pageId}`,
    method: 'patch' as const,
    headers: NOTION_REQUEST_HEADER,
    payload: JSON.stringify(data),
  }));

  const results = UrlFetchApp.fetchAll(requests);
  return results.map(result => JSON.parse(result.getContentText()));
}
