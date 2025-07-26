import { createNotionClient } from '@clarity-suite/notion';
import { assert } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { getGoogleFinanceQuery } from 'services/_shared/sheet';
import { CURRENCY_DATA } from './constants';

export const calcCurrencyData = (
	sheet: GoogleAppsScript.Spreadsheet.Sheet,
	row: number,
	환율이름: string,
) => {
	sheet.getRange(row, 1).setValue(환율이름);
	const currencyName = 환율이름.replace(/\//, '');

	CURRENCY_DATA.forEach((proprety, index) => {
		const column = index + 2;
		sheet
			.getRange(row, column)
			.setValue(getGoogleFinanceQuery(`"CURRENCY:${currencyName}"`, proprety));
	});
};

export const getAllCurrencyPages = (notionDbId: string) => {
	assert(appsScriptProperties.NOTION_SECRET, 'The script property "NOTION_SECRET" is not set. Please check Project Settings > Script properties.');

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	return notion.getPages(notionDbId, {
		filter: {
			property: '이름',
			title: {
				is_not_empty: true,
			},
		},
	});
};
