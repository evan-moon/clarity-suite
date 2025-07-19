import { isFullPage, PageObjectResponse } from '@notionhq/client';
import type { PropertyValue } from './types';
import {
	handleNumber,
	handleSelect,
	handleMultiSelect,
	handleRelation,
	handleFormula,
	handleRollup,
	handleCheckbox,
	handleRichText,
	handleDate,
	handleTitle,
} from './handlers';

export const getTitleText = (
	property: PageObjectResponse['properties'][string] | undefined,
) => {
	if (property == null || property.type !== 'title') {
		return '';
	}
	return property.title[0]?.plain_text ?? '';
};

export const isFullPageWithId = (
	page: PageObjectResponse,
): page is PageObjectResponse & { id: string } => {
	return isFullPage(page);
};

const convertValueToNotionProperty: Record<
	string,
	(value: PropertyValue) => any
> = {
	title: handleTitle,
	number: handleNumber,
	select: handleSelect,
	multi_select: handleMultiSelect,
	relation: handleRelation,
	formula: handleFormula,
	rollup: handleRollup,
	checkbox: handleCheckbox,
	rich_text: handleRichText,
	date: handleDate,
};

/**
 * 원본 DB의 properties에서 지정한 컬럼만 추출해 Notion DB에 쓸 수 있는 properties로 변환합니다.
 * @param properties 원본 DB의 properties
 * @param excludeKeys 제외할 원본 DB 컬럼들의 배열 (기본값: 빈 배열)
 * @param options 추가 옵션들
 */
export function extractNotionProperties(
	properties: Record<string, PropertyValue>,
	excludeKeys: string[] = [],
	options?: {
		ignoreTitle: boolean;
	},
): Record<string, any> {
	return Object.entries(properties).reduce(
		(acc, [key, value]) => {
			// 제외할 키인 경우 스킵
			if (excludeKeys.includes(key)) {
				Logger.log(`[extractNotionProperties] '${key}'는 제외 대상입니다.`);
				return acc;
			}

			if (options?.ignoreTitle === true && value.type === 'title') {
				return acc;
			}

			const handler = convertValueToNotionProperty[value.type];
			if (!handler) {
				Logger.log(
					`[extractNotionProperties] '${key}'의 타입 '${value.type}'을 처리할 핸들러가 없습니다.`,
				);
				return acc;
			}

			const result = handler(value);
			if (result !== undefined) {
				Logger.log(`[extractNotionProperties] '${key}' 변환 성공:`, result);
				acc[key] = result;
			} else {
				Logger.log(
					`[extractNotionProperties] '${key}' 변환 결과가 undefined입니다.`,
				);
			}
			return acc;
		},
		{} as Record<string, any>,
	);
}
