import { createNotionClient } from 'notion/api';
import { appsScriptProperties } from 'appsScriptProperties';
import { assertEnv } from 'asserts';

export function clearNotionTable(notionDbId: string) {
  assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

  const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);

  try {
    return notion.deleteAllPagesInDatabase(notionDbId);
  } catch (e) {
    Logger.log(e);
  }
}
