import type { NotionProperties, PropertyValue } from '@clarity-suite/notion';
import { extractNotionProperties } from '@clarity-suite/notion';
import { formatYYYYMM } from '@clarity-suite/utils';

export function buildPortfolioSnapshotProperties(
	properties: Record<string, PropertyValue>,
	pageId: string,
	now: Date,
): NotionProperties {
	const snapshotProperties = extractNotionProperties(
		properties,
		['스냅샷 목록'],
		{ ignoreTitle: true },
	);
	return {
		...snapshotProperties,
		'연결된 포트폴리오': { relation: [{ id: pageId }] },
		날짜: { date: { start: now.toISOString().split('T')[0] } },
		ID: { title: [{ type: 'text', text: { content: formatYYYYMM(now) } }] },
	};
}
