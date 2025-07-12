import {
  CreatePageParameters,
  DatabaseObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';

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
  createPage: (databaseId: string, properties: CreatePageParameters['properties']) => {
    const url = 'https://api.notion.com/v1/pages';
    const result = UrlFetchApp.fetch(url, {
      method: 'post',
      headers: requestHeader,
      payload: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });

    return JSON.parse(result.getContentText());
  },
  deleteAllPagesInDatabase: (databaseId: string): number => {
    const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;
    const result = UrlFetchApp.fetch(queryUrl, {
      method: 'post',
      headers: requestHeader,
      payload: JSON.stringify({}),
    });

    const { results } = JSON.parse(result.getContentText());

    Logger.log(`${databaseId} 테이블에서 ${results.length}개의 Row를 발견했어요.`);
    if (!results || results.length === 0) return 0;

    const requests = results.map((page: { id: string }) => ({
      url: `https://api.notion.com/v1/pages/${page.id}`,
      method: 'patch' as const,
      headers: requestHeader,
      payload: JSON.stringify({ archived: true }),
    }));
    UrlFetchApp.fetchAll(requests);
    return results.length;
  },
});
