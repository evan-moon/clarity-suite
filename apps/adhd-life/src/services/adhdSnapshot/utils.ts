import type { NotionProperties, PropertyValue } from '@clarity-suite/notion';
import { extractNotionProperties } from '@clarity-suite/notion';
import { SNAPSHOT_PROPERTY_MAP } from './constants';

export function buildAdhdLifeSnapshotProperties(
	properties: Record<string, PropertyValue>,
): NotionProperties {
	return extractNotionProperties(properties, SNAPSHOT_PROPERTY_MAP);
}
