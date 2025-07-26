import { createNotionClient } from '@clarity-suite/notion';
import { assert } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';

export function clearNotionTable(notionDbId: string) {
	assert(appsScriptProperties.NOTION_SECRET, 'The script property "NOTION_SECRET" is not set. Please check Project Settings > Script properties.');

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);

	try {
		return notion.deleteAllPagesInDatabase(notionDbId);
	} catch (e) {
		Logger.log(e);
	}
}
