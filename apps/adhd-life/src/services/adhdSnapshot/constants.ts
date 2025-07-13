type SnapshotDBKey = string;
type OriginDBKey = string;

export const SNAPSHOT_PROPERTY_MAP: Record<SnapshotDBKey, OriginDBKey> = {
	Title: 'Title',
	Status: 'Status',
	'Is Routine?': 'Is Routine?',
	'Estimated Time (min)': 'Estimated Time (min)',
	'Start Time': 'Start Time',
	'End Time': 'End Time',
	Notes: 'Notes',
	'Due Date (Text)': 'Due Date (Text)',
	'Finished On Time?': 'Finished On Time?',
};
