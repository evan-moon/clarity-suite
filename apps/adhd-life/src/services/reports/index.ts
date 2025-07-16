import { createNotionClient } from '@clarity-suite/notion';
import { assertEnv } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { getRoutineSuccessRate, getStartAndEndOfThisWeek } from './utils';

export function generateWeeklyReport(
	reportDbId: string,
	taskSnapshotDbId: string,
) {
	assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);

	// 1. 최신 리포트 페이지 가져오기
	const recentPage = notion.getRecentPage(reportDbId);
	if (!recentPage) {
		throw new Error('최신 리포트 페이지를 찾을 수 없습니다.');
	}

	// 2. 해당 페이지의 블록(children) 가져오기
	const blocks = notion.getBlockChildren(recentPage.id);

	// 3. 재귀적으로 '루틴 성공율' heading_3 블록 찾기
	const result = notion.findBlockRecursively(
		blocks,
		(block) =>
			block.type === 'heading_3' &&
			block.heading_3?.rich_text?.some((t) =>
				t.plain_text?.includes('루틴 성공율'),
			),
	);

	if (!result) {
		throw new Error('"루틴 성공율" 블록을 찾을 수 없습니다.');
	}

	const { parentBlocks, index } = result;
	const quoteBlock = parentBlocks[index + 1];
	if (!quoteBlock || quoteBlock.type !== 'quote') {
		throw new Error('"루틴 성공율" 다음에 Quote 블록이 없습니다.');
	}

	// 4. 이번 주 루틴 스냅샷 가져오기 및 성공률 계산
	const { start, end } = getStartAndEndOfThisWeek();
	const { total, completed, successRate } = getRoutineSuccessRate(
		notion,
		taskSnapshotDbId,
		start,
		end,
	);

	Logger.log(
		`${start.toISOString()}부터 ${end.toISOString()} 사이에 시도한 총 ${total}개의 루틴 중 ${completed}개 성공`,
	);

	// 5. Quote 블록에 성공률 입력
	notion.updateBlock(quoteBlock.id, {
		quote: {
			rich_text: [
				{
					type: 'text',
					text: { content: `${successRate}%` },
				},
			],
		},
	});
}
