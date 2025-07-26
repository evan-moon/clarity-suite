import { createNotionClient } from '@clarity-suite/notion';
import { assert } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { getGoogleFinanceQuery } from 'services/_shared/sheet';
import { STOCK_DATA } from './constants';

export const calcStockData = (
	sheet: GoogleAppsScript.Spreadsheet.Sheet,
	row: number,
	ticker: string,
) => {
	sheet.getRange(row, 1).setValue(ticker);

	const rowRef = `$A${row}`;
	STOCK_DATA.forEach((proprety, index) => {
		const column = index + 2;

		sheet
			.getRange(row, column)
			.setValue(getGoogleFinanceQuery(rowRef, proprety));
	});
};

export const getAllStockPages = (notionDbId: string) => {
	assert(appsScriptProperties.NOTION_SECRET, 'The script property "NOTION_SECRET" is not set. Please check Project Settings > Script properties.');

	const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
	return notion.getPages(notionDbId, {
		filter: {
			property: '티커',
			title: {
				is_not_empty: true,
			},
		},
	});
};
