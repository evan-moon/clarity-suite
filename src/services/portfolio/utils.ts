import { SNAPSHOT_PROPERTY_MAP } from './constants';
import { formatYYYYMM } from '../_shared/date';
import { convertValueToNotionProperty } from 'notion/utils';
import { NotionProperties, PropertyValue } from 'notion/types';

export function buildPortfolioSnapshotProperties(
  properties: Record<string, PropertyValue>,
  pageId: string,
  now: Date
): NotionProperties {
  const snapshotProperties = Object.entries(SNAPSHOT_PROPERTY_MAP).reduce((acc, [snapshotKey, infoKey]) => {
    const value = properties[infoKey];
    if (!value) return acc;
    const handler = convertValueToNotionProperty[value.type];
    if (handler) {
      const result = handler(value);
      if (result !== undefined) acc[snapshotKey] = result;
    }
    return acc;
  }, {} as NotionProperties);

  return {
    ...snapshotProperties,
    'Portfolio Info': { relation: [{ id: pageId }] },
    Date: { date: { start: now.toISOString().split('T')[0] } },
    ID: { title: [{ type: 'text', text: { content: formatYYYYMM(now) } }] },
  };
}
