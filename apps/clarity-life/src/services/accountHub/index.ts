import { assertEnvs } from 'services/_shared/asserts';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { createNotionClient } from '@clarity-suite/notion';
import { buildSnapshotProperties } from './utils';

const PENDING_KEY = 'Snapshot Status';

export function takeAccountHubSnapshots(
	originDbId: string,
	snapshotDbId: string,
) {
	assertEnvs(appsScriptProperties);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	try {
		const { results: pages } = notion.getPages(originDbId, {});
		Logger.log(`${pages.length}개의 페이지를 발견했습니다. 스냅샷을 찍을게요.`);

		if (!pages.length) {
			return;
		}

		const now = new Date();

		pages.forEach((page) => {
			const { properties, id: pageId } = page;
			const snapshotProperties = buildSnapshotProperties(
				properties,
				pageId,
				now,
			);
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

		Logger.log(`${pages.length}개의 페이지의 스냅샷을 찍었어요.`);
	} catch (e) {
		Logger.log(e);
	}
}
