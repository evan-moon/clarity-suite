import {
  DatabaseObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';

function getNotionHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  };
}

export function getDataFromNotion(
  databaseId: string,
  data: Omit<QueryDatabaseParameters, 'database_id'>,
  token: string
): { results: PageObjectResponse[] } {
  const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'post',
    headers: getNotionHeaders(token),
    payload: JSON.stringify(data),
  });

  return JSON.parse(result.getContentText());
}

export function updateDataInNotionBatch<Payload = any>(updates: { pageId: string; data: Payload }[], token: string) {
  if (updates.length === 0) return [];

  const requests = updates.map(({ pageId, data }) => ({
    url: `https://api.notion.com/v1/pages/${pageId}`,
    method: 'patch' as const,
    headers: getNotionHeaders(token),
    payload: JSON.stringify(data),
  }));

  const results = UrlFetchApp.fetchAll(requests);
  return results.map(result => JSON.parse(result.getContentText()));
}

export function findNotionDatabaseByName(name: string, token: string) {
  const queryUrl = 'https://api.notion.com/v1/search';

  const result = UrlFetchApp.fetch(queryUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      query: name,
      filter: { property: 'object', value: 'database' },
    }),
    headers: getNotionHeaders(token),
    muteHttpExceptions: true,
  });

  const response = JSON.parse(result.getContentText()) as { results: DatabaseObjectResponse[] };

  if (response.results) {
    response.results = response.results.filter(db => {
      const titleProperty = db.title[0];
      return titleProperty?.plain_text === name;
    });
  }

  return response;
}
