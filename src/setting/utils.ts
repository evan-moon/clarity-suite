import { findNotionDatabaseByName } from '../notion/api';
import { SCRIPT_PROPERTIES_MAP } from './constants';

export function isValidScriptProperty(key: string): key is keyof typeof SCRIPT_PROPERTIES_MAP {
  return key in SCRIPT_PROPERTIES_MAP;
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
