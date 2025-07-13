import { SNAPSHOT_PROPERTY_MAP } from './constants';
import {
	extractNotionProperties,
	NotionProperties,
	PropertyValue,
} from '@clarity-suite/notion';

export function buildAdhdLifeSnapshotProperties(
	properties: Record<string, PropertyValue>,
	pageId: string,
	now: Date,
): NotionProperties {
	const snapshotProperties = extractNotionProperties(
		properties,
		SNAPSHOT_PROPERTY_MAP,
	);
	return {
		...snapshotProperties,
		'Origin Task': { relation: [{ id: pageId }] },
		'Snapshot Date': { date: { start: now.toISOString().split('T')[0] } },
	};
}
