import { assertEnvs } from 'asserts';
import { appsScriptProperties } from 'appsScriptProperties';
import { createNotionClient } from 'notion/api';
import { SNAPSHOT_PROPERTY_MAP } from './constants';
import { formatYYYYMM } from './utils';

export async function takeAccountHubSnapshots(originDbId: string, snapshotDbId: string): Promise<void> {
  assertEnvs(appsScriptProperties);

  const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
  const filter = {
    property: 'Waiting Snapshot...',
    checkbox: { equals: true },
  };
  const { results: pages } = notion.getPages(originDbId, { filter });
  if (!pages.length) return;

  const now = new Date();
  const updates = [];
  for (const page of pages) {
    const { properties, id: pageId } = page;
    const snapshotProperties: Record<string, any> = {};
    for (const [snapshotKey, infoKey] of Object.entries(SNAPSHOT_PROPERTY_MAP)) {
      const value = properties[infoKey];
      if (!value) {
        continue;
      }

      if (value.type === 'number') {
        snapshotProperties[snapshotKey] = { number: value.number };
      } else if (value.type === 'select') {
        snapshotProperties[snapshotKey] = { select: value.select };
      } else if (value.type === 'relation') {
        snapshotProperties[snapshotKey] = { relation: value.relation };
      } else if (value.type === 'formula') {
        if (value.formula.type === 'number') {
          snapshotProperties[snapshotKey] = { number: value.formula.number };
        } else if (value.formula.type === 'string') {
          snapshotProperties[snapshotKey] = {
            rich_text: [{ type: 'text', text: { content: value.formula.string ?? '' } }],
          };
        } else if (value.formula.type === 'boolean') {
          snapshotProperties[snapshotKey] = { checkbox: value.formula.boolean ?? false };
        } else if (value.formula.type === 'date') {
          snapshotProperties[snapshotKey] = { date: value.formula.date };
        }
      } else if (value.type === 'rollup') {
        if (value.rollup.type === 'number') {
          snapshotProperties[snapshotKey] = { number: value.rollup.number };
        } else if (value.rollup.type === 'date') {
          snapshotProperties[snapshotKey] = { date: value.rollup.date };
        } else if (value.rollup.type === 'array') {
          // 필요시 array 처리
        }
      } else if (value.type === 'checkbox') {
        snapshotProperties[snapshotKey] = { checkbox: value.checkbox };
      } else if (value.type === 'rich_text') {
        snapshotProperties[snapshotKey] = { rich_text: value.rich_text };
      }
    }

    snapshotProperties['Account Info'] = {
      relation: [{ id: page.id }],
    };
    snapshotProperties['Date'] = {
      date: { start: now.toISOString().split('T')[0] },
    };
    snapshotProperties['ID'] = {
      title: [{ type: 'text', text: { content: formatYYYYMM(now) } }],
    };
    try {
      notion.createPage(snapshotDbId, snapshotProperties);
    } catch (e) {
      Logger.log(e);
    }

    updates.push({
      pageId,
      data: {
        properties: {
          'Waiting Snapshot...': { checkbox: false },
        },
      },
    });
  }
  notion.updateAll(updates);
}
