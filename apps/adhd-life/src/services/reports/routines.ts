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

function getRoutineMessage(successRate: number): string {
	if (successRate === 100) {
		return '완벽한 한 주! 모든 루틴을 달성했어요! 🎉';
	} else if (successRate >= 70) {
		return '거의 다 왔어요! 멋진 루틴러!';
	} else if (successRate > 50) {
		return '절반을 넘었어요! 꾸준함이 쌓이고 있습니다.';
	} else if (successRate > 20) {
		return '조금씩 습관이 잡히고 있어요. 계속 도전해봐요!';
	} else {
		return '아직 시작 단계예요! 조금씩 루틴을 늘려봐요.';
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
				t.plain_text?.includes('이번 주 루틴 성공율'),
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
		!messageBlock.paragraph?.rich_text?.[0]?.plain_text?.includes('성공 문구')
	) {
		throw new Error('Quote 블록 바로 아래에 "성공 문구" 블록이 없습니다.');
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
