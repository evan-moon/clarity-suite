import { createNotionClient } from '@clarity-suite/notion';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { assertEnv } from 'services/_shared/asserts';

export function clearNotionTable(notionDbId: string) {
	assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);

	try {
		return notion.deleteAllPagesInDatabase(notionDbId);
	} catch (e) {
		Logger.log(e);
	}
}
