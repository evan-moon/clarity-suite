import {
  DatabaseObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { appsScriptProperties } from 'appsScriptProperties';

const requestHeader = {
  Authorization: `Bearer ${appsScriptProperties.NOTION_SECRET}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

export const createNotionClient = (token: string) => ({
  getPages: (
    databaseId: string,
    data: Omit<QueryDatabaseParameters, 'database_id'>
  ): { results: PageObjectResponse[] } => {
    const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

    const result = UrlFetchApp.fetch(queryUrl, {
      method: 'post',
      headers: requestHeader,
      payload: JSON.stringify(data),
    });

    return JSON.parse(result.getContentText());
  },
  updateAll: (updates: { pageId: string; data: unknown }[]) => {
    if (updates.length === 0) {
      return [];
    }

    const requests = updates.map(({ pageId, data }) => ({
      url: `https://api.notion.com/v1/pages/${pageId}`,
      method: 'patch' as const,
      headers: requestHeader,
      payload: JSON.stringify(data),
    }));

    const results = UrlFetchApp.fetchAll(requests);
    return results.map(result => JSON.parse(result.getContentText()));
  },
  findDatabaseByName: (name: string, token: string) => {
    const queryUrl = 'https://api.notion.com/v1/search';

    const result = UrlFetchApp.fetch(queryUrl, {
      method: 'post',
      payload: JSON.stringify({
        query: name,
        filter: { property: 'object', value: 'database' },
      }),
      headers: {
        ...requestHeader,
        Authorization: `Bearer ${token}`,
      },
    });

    const response = JSON.parse(result.getContentText()) as { results: DatabaseObjectResponse[] };

    if (response.results) {
      response.results = response.results.filter(db => {
        const titleProperty = db.title[0];
        return titleProperty?.plain_text === name;
      });
    }

    return response;
  },
});
