import { createNotionClient } from '@clarity-suite/notion';
import { assertEnv } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { updateRoutineSuccessRate } from './routines';

export function generateWeeklyReport(
	reportDbId: string,
	taskSnapshotDbId: string,
) {
	assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);

	const recentPage = notion.getRecentPage(reportDbId);
	if (!recentPage) {
		throw new Error('최신 리포트 페이지를 찾을 수 없습니다.');
	}

	const blocks = notion.getBlockChildren(recentPage.id);
	updateRoutineSuccessRate(notion, taskSnapshotDbId, blocks);
}
