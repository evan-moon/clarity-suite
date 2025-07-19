import type { NotionProperties, PropertyValue } from '@clarity-suite/notion';
import { extractNotionProperties } from '@clarity-suite/notion';

export function buildAdhdLifeSnapshotProperties(
	properties: Record<string, PropertyValue>,
): NotionProperties {
	return extractNotionProperties(properties, []); // 제외할 키가 없다면 빈 배열
}
