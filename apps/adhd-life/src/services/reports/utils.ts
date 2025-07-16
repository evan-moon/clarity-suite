import { createNotionClient } from '@clarity-suite/notion';

export function getStartAndEndOfThisWeek() {
	const now = new Date();
	const day = now.getDay(); // 0(일)~6(토)
	const diffToMonday = (day + 6) % 7; // 월요일이 0

	const start = new Date(now);
	start.setDate(now.getDate() - diffToMonday);
	start.setHours(0, 0, 0, 0);

	return { start, end: now };
}

export function getRoutineSuccessRate(
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
