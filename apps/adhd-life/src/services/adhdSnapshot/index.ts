import { appsScriptProperties } from '../_shared/appsScriptProperties';
import { createNotionClient } from '@clarity-suite/notion';
import { buildAdhdLifeSnapshotProperties } from './utils';
import { assertEnv } from '@clarity-suite/utils';

export function takeAdhdLifeSnapshots(
	originDbId: string,
	snapshotDbId: string,
) {
	assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	try {
		const { results: pages } = notion.getPages(originDbId, {});
		Logger.log(`${pages.length}개의 페이지를 발견했습니다. 스냅샷을 찍을게요.`);
		if (!pages.length) return;

		pages.forEach((page) => {
			const { properties } = page;
			const snapshotProperties = buildAdhdLifeSnapshotProperties(properties);
			try {
				notion.createPage(snapshotDbId, snapshotProperties);
			} catch (e) {
				Logger.log(e);
			}
		});
		Logger.log(`${pages.length}개의 페이지의 스냅샷을 찍었어요.`);
	} catch (e) {
		Logger.log(e);
	}
}
