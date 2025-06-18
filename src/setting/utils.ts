import { findNotionDatabaseByName } from '../notion/api';
import { 스크립트속성 } from './constants';

export function isValidScriptProperty(key: string): key is keyof typeof 스크립트속성 {
  return key in 스크립트속성;
}

export function findDatabaseId(token: string, name: string): string {
  if (!token || !name) {
    return '';
  }

  if (name.replace(/-/g, '').length >= 32) return name.replace(/-/g, '');

  const response = findNotionDatabaseByName(name, token);

  const result = response.results[0].id;
  return result ? result.replace(/-/g, '') : '';
}
