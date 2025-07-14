import { assertEnvs } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { createNotionClient } from '@clarity-suite/notion';
import { buildSnapshotProperties } from './utils';

export function takeAccountHubSnapshots(
	originDbId: string,
	snapshotDbId: string,
) {
	assertEnvs(appsScriptProperties);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	const { results: pages } = notion.getPages(originDbId, {});
	Logger.log(
		`${pages.length}개의 계좌 페이지를 발견했습니다. 스냅샷을 찍을게요.`,
	);

	if (!pages.length) {
		Logger.log('스냅샷 대상 페이지가 없습니다.');
		return;
	}

	const now = new Date();

	pages.forEach((page) => {
		const { properties, id: pageId } = page;
		const snapshotProperties = buildSnapshotProperties(properties, pageId, now);
		try {
			notion.createPage(snapshotDbId, snapshotProperties);
		} catch (e) {
			Logger.log(e);
		}
	});

	Logger.log(`${pages.length}개의 계좌 페이지의 스냅샷을 찍었어요.`);
}
