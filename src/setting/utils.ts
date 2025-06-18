import { 스크립트속성 } from './constants';

export function isValidScriptProperty(key: string): key is keyof typeof 스크립트속성 {
  return key in 스크립트속성;
}

export function findDatabaseId(token: string, name: string): string {
  if (!token || !name) return '';

  // 이미 ID 형태라면 바로 반환
  if (name.replace(/-/g, '').length >= 32) return name.replace(/-/g, '');

  const response = UrlFetchApp.fetch('https://api.notion.com/v1/search', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      query: name,
      filter: { property: 'object', value: 'database' },
    }),
    headers: {
      'Notion-Version': '2022-06-28',
      Authorization: `Bearer ${token}`,
    },
    muteHttpExceptions: true,
  });

  if (response.getResponseCode() !== 200) return '';
  const data = JSON.parse(response.getContentText());
  const result = data.results?.[0]?.id as string | undefined;
  return result ? result.replace(/-/g, '') : '';
}
