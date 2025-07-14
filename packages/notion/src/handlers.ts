import { PropertyValue } from './types';

export function handleTitle(value: PropertyValue) {
	if (value.type !== 'title') return undefined;
	const text = value.title?.[0]?.plain_text ?? '';
	return {
		title: [
			{
				type: 'text',
				text: { content: text },
			},
		],
	};
}

export function handleNumber(value: PropertyValue) {
	if (value.type !== 'number') return undefined;
	return { number: value.number };
}

export function handleSelect(value: PropertyValue) {
	if (value.type !== 'select') return undefined;

	/**
	 * @note 옮길 대상 테이블에 원하는 옵션이 없으면 복사가 되지 않기 때문에 텍스트로 변환
	 */
	return {
		rich_text: [{ type: 'text', text: { content: value.select?.name ?? '' } }],
	};
}

export function handleMultiSelect(value: PropertyValue) {
	if (value.type !== 'multi_select') return undefined;
	const names = value.multi_select?.map((opt) => opt.name).join(', ') ?? '';
	return { rich_text: [{ type: 'text', text: { content: names } }] };
}

export function handleRelation(value: PropertyValue) {
	if (value.type !== 'relation') return undefined;
	return { relation: value.relation as { id: string }[] };
}

export function handleFormula(value: PropertyValue) {
	if (value.type !== 'formula') return undefined;
	switch (value.formula.type) {
		case 'number':
			return { number: value.formula.number };
		case 'string':
			return {
				rich_text: [
					{ type: 'text', text: { content: value.formula.string ?? '' } },
				],
			};
		case 'boolean':
			return { checkbox: value.formula.boolean ?? false };
		case 'date':
			return { date: value.formula.date };
		default:
			return undefined;
	}
}

export function handleRollup(value: PropertyValue) {
	if (value.type !== 'rollup') return undefined;
	switch (value.rollup.type) {
		case 'number':
			return { number: value.rollup.number };
		case 'date':
			return { date: value.rollup.date };
		default:
			return undefined;
	}
}

export function handleCheckbox(value: PropertyValue) {
	if (value.type !== 'checkbox') return undefined;
	return { checkbox: value.checkbox };
}

export function handleRichText(value: PropertyValue) {
	if (value.type !== 'rich_text') return undefined;
	return { rich_text: value.rich_text };
}

export function handleDate(value: PropertyValue) {
	if (value.type !== 'date') return undefined;
	return {
		date: {
			start: value.date?.start,
			end: value.date?.end,
			time_zone: value.date?.time_zone,
		},
	};
}
