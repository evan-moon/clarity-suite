import { isFullPage } from '@notionhq/client';
import { createNotionClient, isFullPageWithId } from '@clarity-suite/notion';
import { queryNotionEmptyRatePages } from './utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { assert } from '@clarity-suite/utils';
import { clearSheet } from '@clarity-suite/sheets';

export function syncTradebookTransactionsCurrencies(
	sheetName: string,
	notionDbId: string,
) {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
	if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);

	const pages = queryNotionEmptyRatePages(notionDbId);
	if (pages.length === 0) return;

	pages.forEach((page, i) => {
		if (isFullPage(page) === false) {
			return;
		}

		const row = i + 2;

		const dateProperty = page.properties.날짜;
		const fromProperty = page.properties.거래통화;
		const toProperty = page.properties.계좌통화;

		if (
			dateProperty.type !== 'date' ||
			fromProperty.type !== 'select' ||
			toProperty.type !== 'formula'
		) {
			return;
		}

		const date = dateProperty.date?.start;
		const fromSelect = fromProperty.select;
		const toFormula = toProperty.formula;
		const from = fromSelect ? fromSelect.name : '';
		const to = toFormula.type === 'string' ? (toFormula.string ?? '') : '';

		const isSameCurrency = from === to;

		sheet.getRange(row, 1).setValue(date);
		sheet.getRange(row, 2).setValue(from);
		sheet.getRange(row, 3).setValue(to);
		sheet
			.getRange(row, 4)
			.setFormula(
				isSameCurrency
					? '1'
					: `=iferror(index(googlefinance(B${row}&C${row},"price",A${row},A${row} + 2), 2, 2), "")`,
			);
	});

	SpreadsheetApp.flush();

	const updates = pages
		.filter(isFullPageWithId)
		.map((page, i) => {
			const row = i + 2;
			const rate = sheet.getRange(row, 4).getValue();
			if (rate !== '' && !isNaN(rate)) {
				return {
					pageId: page.id,
					data: {
						properties: {
							환율: { number: rate },
							상태: { select: { name: '완료' } },
						},
					},
				};
			}
			return null;
		})
		.filter((update): update is NonNullable<typeof update> => update != null);

	if (updates.length > 0) {
		assert(appsScriptProperties.NOTION_SECRET, 'The script property "NOTION_SECRET" is not set. Please check Project Settings > Script properties.');

		const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
		notion.updateAll(updates);
		Logger.log(`${updates.length}개의 환율이 노션에 업데이트되었어요.`);
	}

	clearSheet(sheetName);
}
