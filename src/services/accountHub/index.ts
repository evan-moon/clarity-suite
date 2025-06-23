import { assertEnvs } from 'asserts';
import { appsScriptProperties } from 'appsScriptProperties';
import { createNotionClient } from 'notion/api';
import { buildSnapshotProperties } from './utils';

const PENDING_KEY = 'Snapshot Status';

export async function takeAccountHubSnapshots(originDbId: string, snapshotDbId: string): Promise<void> {
  assertEnvs(appsScriptProperties);
  const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
  const filter = {
    property: PENDING_KEY,
    select: { equals: 'Creating...' },
  };
  const { results: pages } = notion.getPages(originDbId, { filter });
  if (!pages.length) return;

  const now = new Date();

  const updates = pages.map(page => {
    const { properties, id: pageId } = page;
    const snapshotProperties = buildSnapshotProperties(properties, pageId, now);
    try {
      notion.createPage(snapshotDbId, snapshotProperties);
    } catch (e) {
      Logger.log(e);
    }
    return {
      pageId,
      data: {
        properties: {
          [PENDING_KEY]: { select: { name: 'Ready' } },
        },
      },
    };
  });

  notion.updateAll(updates);
}
