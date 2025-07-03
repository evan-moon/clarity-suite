import { assertEnvs } from 'asserts';
import { appsScriptProperties } from 'appsScriptProperties';
import { createNotionClient } from 'notion/api';
import { buildPortfolioSnapshotProperties } from './utils';

const PENDING_KEY = 'Snapshot Status';

export function takePortfolioSnapshots(originDbId: string, snapshotDbId: string) {
  assertEnvs(appsScriptProperties);

  const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
  const filter = {
    property: PENDING_KEY,
    select: { equals: 'Creating...' },
  };
  const { results: pages } = notion.getPages(originDbId, { filter });
  const filteredPages = pages.filter(page => {
    const shares = page.properties?.Shares;
    return shares && shares.type === 'formula' && shares.formula.type === 'number' && (shares.formula.number ?? 0) > 0;
  });

  Logger.log(`${filteredPages.length}개의 포트폴리오 페이지를 발견했습니다.`);

  if (!filteredPages.length) {
    Logger.log('Shares > 0 인 페이지가 없습니다.');
    return;
  }

  const now = new Date();

  const updates = filteredPages.map(page => {
    const { properties, id: pageId } = page;
    const snapshotProperties = buildPortfolioSnapshotProperties(properties, pageId, now);
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

  Logger.log(`${filteredPages.length}개의 포트폴리오 페이지의 스냅샷을 찍었어요.`);
}
