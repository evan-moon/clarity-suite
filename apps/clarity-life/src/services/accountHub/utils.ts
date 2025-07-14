import { SNAPSHOT_PROPERTY_MAP } from './constants';
import { formatYYYYMM } from '@clarity-suite/utils';
import {
	extractNotionProperties,
	NotionProperties,
	PropertyValue,
} from '@clarity-suite/notion';

export function buildSnapshotProperties(
	properties: Record<string, PropertyValue>,
	pageId: string,
	now: Date,
): NotionProperties {
	const snapshotProperties = extractNotionProperties(
		properties,
		SNAPSHOT_PROPERTY_MAP,
		{ ignoreTitle: true },
	);
	Logger.log(snapshotProperties);

	return {
		...snapshotProperties,
		'Account Info': { relation: [{ id: pageId }] },
		Date: { date: { start: now.toISOString().split('T')[0] } },
		ID: { title: [{ type: 'text', text: { content: formatYYYYMM(now) } }] },
	};
}
