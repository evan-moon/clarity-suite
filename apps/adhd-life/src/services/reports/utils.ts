import { createNotionClient } from '@clarity-suite/notion';
import { BlockObjectResponse } from '@notionhq/client';

function getStartOfThisWeek() {
	const now = new Date();
	const day = now.getDay();
	const diffToMonday = (day + 6) % 7;

	const start = new Date(now);
	start.setDate(now.getDate() - diffToMonday);
	start.setHours(0, 0, 0, 0);

	return { start, now };
}

function getRoutineSuccessRate(
	notion: ReturnType<typeof createNotionClient>,
	taskSnapshotDbId: string,
	start: Date,
	end: Date,
) {
	const rows = notion.getPages(taskSnapshotDbId, {
		filter: {
			and: [
				{
					property: 'Snapshot Date',
					date: {
						on_or_after: start.toISOString(),
						on_or_before: end.toISOString(),
					},
				},
				{
					property: 'Is Routine?',
					checkbox: { equals: true },
				},
			],
		},
		page_size: 100,
	});
	const total = rows.results.length;
	const completed = rows.results.filter(
		(row) =>
			row.properties.Status.type === 'rich_text' &&
			row.properties.Status.rich_text?.[0]?.plain_text === 'Done',
	).length;
	const successRate = total === 0 ? 0 : Math.round((completed / total) * 100);
	return { total, completed, successRate };
}

export function updateRoutineSuccessRate(
	notion: ReturnType<typeof createNotionClient>,
	taskSnapshotDbId: string,
	blocks: BlockObjectResponse[],
) {
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

	const { start, now } = getStartOfThisWeek();
	const { total, completed, successRate } = getRoutineSuccessRate(
		notion,
		taskSnapshotDbId,
		start,
		now,
	);

	Logger.log(
		`${start.toISOString()}부터 ${now.toISOString()} 사이에 시도한 총 ${total}개의 루틴 중 ${completed}개 성공`,
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
