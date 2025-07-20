import { createNotionClient } from '@clarity-suite/notion';
import { assertEnv } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';

export function clearNotionTable(notionDbId: string) {
	assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);

	try {
		return notion.deleteAllPagesInDatabase(notionDbId);
	} catch (e) {
		Logger.log(e);
	}
}
