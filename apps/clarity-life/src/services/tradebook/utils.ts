import { createNotionClient } from '@clarity-suite/notion';
import { assert } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';

export function queryNotionEmptyRatePages(notionDbId: string) {
	assert(
		appsScriptProperties.NOTION_SECRET,
		'The script property "NOTION_SECRET" is not set. Please check Project Settings > Script properties.',
	);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	const res = notion.getPages(notionDbId, {
		filter: {
			and: [
				{ property: '날짜', date: { is_not_empty: true } },
				{ property: '거래통화', select: { is_not_empty: true } },
				{
					property: '변환통화',
					select: { is_not_empty: true },
				},
				{ property: '환율', number: { is_empty: true } },
			],
		},
	});

	return res.results;
}
