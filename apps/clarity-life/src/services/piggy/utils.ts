import { createNotionClient } from '@clarity-suite/notion';
import { assertEnv } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';

export function queryNotionEmptyRatePiggyPages(notionDbId: string) {
	assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	const res = notion.getPages(notionDbId, {
		filter: {
			and: [
				{ property: '날짜', date: { is_not_empty: true } },
				{ property: '거래통화', select: { is_not_empty: true } },
				{
					property: '계좌통화',
					formula: { string: { is_not_empty: true } },
				},
				{ property: '환율', number: { is_empty: true } },
			],
		},
	});

	return res.results;
}
