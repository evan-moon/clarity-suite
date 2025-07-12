import { createNotionClient } from 'services/_shared/notion/api';
import { SCRIPT_PROPERTIES_MAP } from './constants';

export function isValidScriptProperty(key: string): key is keyof typeof SCRIPT_PROPERTIES_MAP {
  return key in SCRIPT_PROPERTIES_MAP;
}

export function findDatabaseId(token: string, name: string): string {
  const notion = createNotionClient(token);
  if (!token || !name) {
    return '';
  }

  if (name.replace(/-/g, '').length >= 32) return name.replace(/-/g, '');

  const response = notion.findDatabaseByName(name, token);
  if (response.results.length === 0) {
    throw new Error(`Could not find a database named "${name}".`);
  }

  if (response.results.length > 1) {
    throw new Error(`There are multiple databases named "${name}". Please use a unique name.`);
  }

  const result = response.results[0].id;
  return result ? result.replace(/-/g, '') : '';
}
