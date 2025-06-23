import { CreatePageParameters } from '@notionhq/client';
import { SNAPSHOT_PROPERTY_MAP } from './constants';

export function formatYYYYMM(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

type NotionProperties = CreatePageParameters['properties'];
export function buildSnapshotProperties(properties: any, pageId: string, now: Date): NotionProperties {
  const snapshotProperties = Object.entries(SNAPSHOT_PROPERTY_MAP).reduce((acc, [snapshotKey, infoKey]) => {
    const value = properties[infoKey];
    if (!value) return acc;
    if (value.type === 'number') {
      acc[snapshotKey] = { number: value.number };
    } else if (value.type === 'select') {
      acc[snapshotKey] = { select: value.select };
    } else if (value.type === 'relation') {
      acc[snapshotKey] = { relation: value.relation as { id: string }[] };
    } else if (value.type === 'formula') {
      if (value.formula.type === 'number') {
        acc[snapshotKey] = { number: value.formula.number };
      } else if (value.formula.type === 'string') {
        acc[snapshotKey] = {
          rich_text: [{ type: 'text', text: { content: value.formula.string ?? '' } }],
        };
      } else if (value.formula.type === 'boolean') {
        acc[snapshotKey] = { checkbox: value.formula.boolean ?? false };
      } else if (value.formula.type === 'date') {
        acc[snapshotKey] = { date: value.formula.date };
      }
    } else if (value.type === 'rollup') {
      if (value.rollup.type === 'number') {
        acc[snapshotKey] = { number: value.rollup.number };
      } else if (value.rollup.type === 'date') {
        acc[snapshotKey] = { date: value.rollup.date };
      } else if (value.rollup.type === 'array') {
        // 필요시 array 처리
      }
    } else if (value.type === 'checkbox') {
      acc[snapshotKey] = { checkbox: value.checkbox };
    } else if (value.type === 'rich_text') {
      acc[snapshotKey] = { rich_text: value.rich_text };
    }
    return acc;
  }, {} as NotionProperties);

  return {
    ...snapshotProperties,
    'Account Info': { relation: [{ id: pageId }] },
    Date: { date: { start: now.toISOString().split('T')[0] } },
    ID: { title: [{ type: 'text', text: { content: formatYYYYMM(now) } }] },
  };
}
