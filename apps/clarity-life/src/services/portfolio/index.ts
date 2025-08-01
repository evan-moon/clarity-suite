import { assert } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { createNotionClient } from '@clarity-suite/notion';
import { buildPortfolioSnapshotProperties } from './utils';

export function takePortfolioSnapshots(
	originDbId: string,
	snapshotDbId: string,
) {
	assert(appsScriptProperties.NOTION_SECRET, 'The script property "NOTION_SECRET" is not set. Please check Project Settings > Script properties.');

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	const { results: pages } = notion.getPages(originDbId, {});
	const filteredPages = pages.filter((page) => {
		const 보유주수 = page.properties?.보유주수;
		return (
			보유주수 &&
			보유주수.type === 'formula' &&
			보유주수.formula.type === 'number' &&
			(보유주수.formula.number ?? 0) > 0
		);
	});

	Logger.log(`${filteredPages.length}개의 포트폴리오 페이지를 발견했습니다.`);

	if (!filteredPages.length) {
		Logger.log('Shares > 0 인 페이지가 없습니다.');
		return;
	}

	const now = new Date();

	filteredPages.forEach((page) => {
		const { properties, id: pageId } = page;
		const snapshotProperties = buildPortfolioSnapshotProperties(
			properties,
			pageId,
			now,
		);
		try {
			notion.createPage(snapshotDbId, snapshotProperties);
		} catch (e) {
			Logger.log(e);
		}
	});

	Logger.log(
		`${filteredPages.length}개의 포트폴리오 페이지의 스냅샷을 찍었어요.`,
	);
}
