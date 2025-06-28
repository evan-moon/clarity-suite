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
  try {
    const { results: pages } = notion.getPages(originDbId, { filter });
    Logger.log(`${pages.length}개의 페이지를 발견했습니다. 스냅샷을 찍을게요.`);

    if (!pages.length) {
      return;
    }

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

    Logger.log(`${pages.length}개의 페이지의 스냅샷을 찍었어요.`);
  } catch (e) {
    Logger.log(e);
  }
}
