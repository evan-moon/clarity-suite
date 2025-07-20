import type { NotionProperties, PropertyValue } from '@clarity-suite/notion';
import { extractNotionProperties } from '@clarity-suite/notion';
import { formatYYYYMM } from '@clarity-suite/utils';

export function buildSnapshotProperties(
	properties: Record<string, PropertyValue>,
	pageId: string,
	now: Date,
): NotionProperties {
	const snapshotProperties = extractNotionProperties(
		properties,
		['스냅샷 목록'],
		{
			ignoreTitle: true,
		},
	);
	Logger.log(snapshotProperties);

	return {
		...snapshotProperties,
		연결계좌: { relation: [{ id: pageId }] },
		날짜: { date: { start: now.toISOString().split('T')[0] } },
		ID: { title: [{ type: 'text', text: { content: formatYYYYMM(now) } }] },
	};
}
