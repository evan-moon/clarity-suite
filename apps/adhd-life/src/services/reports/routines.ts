import type { createNotionClient } from '@clarity-suite/notion';
import type { BlockObjectResponse } from '@notionhq/client';

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

function getRoutineMessage(successRate: number): string {
	if (successRate === 100) {
		return 'Perfect week! You completed all your routines! 🎉';
	} else if (successRate >= 70) {
		return 'Almost there! Great job on your routines!';
	} else if (successRate > 50) {
		return 'Over halfway! Your consistency is building up.';
	} else if (successRate > 20) {
		return 'You are starting to build habits. Keep challenging yourself!';
	} else {
		return 'Just getting started! Try adding more routines little by little.';
	}
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
				t.plain_text?.includes('Routine Success Rate'),
			),
	);

	if (!result) {
		throw new Error('"Routine Success Rate" 블록을 찾을 수 없습니다.');
	}

	const { parentBlocks, index } = result;
	const quoteBlock = parentBlocks[index + 1];
	if (!quoteBlock || quoteBlock.type !== 'quote') {
		throw new Error('"Routine Success Rate" 다음에 Quote 블록이 없습니다.');
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

	const message = getRoutineMessage(successRate);
	const messageBlock = parentBlocks[index + 2];
	if (
		!messageBlock ||
		messageBlock.type !== 'paragraph' ||
		!messageBlock.paragraph?.rich_text?.[0]?.plain_text?.includes(
			'Success Message',
		)
	) {
		throw new Error(
			'Quote 블록 바로 아래에 "Success Message" 블록이 없습니다.',
		);
	}

	notion.updateBlock(messageBlock.id, {
		paragraph: {
			rich_text: [
				{
					type: 'text',
					text: { content: message },
				},
			],
		},
	});
}
