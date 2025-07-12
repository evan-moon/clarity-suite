import { isFullPage } from '@notionhq/client';
import { createNotionClient, isFullPageWithId } from '@clarity-suite/notion';
import { t } from 'services/_shared/i18n';
import { queryNotionEmptyRatePiggyPages } from './utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { assertEnv } from 'services/_shared/asserts';
import { clearSheet } from 'services/_shared/sheet';

export function syncPiggyTransactionsCurrencies(
	sheetName: string,
	notionDbId: string,
) {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
	if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);

	const pages = queryNotionEmptyRatePiggyPages(notionDbId);
	if (pages.length === 0) return;

	pages.forEach((page, i) => {
		if (isFullPage(page) === false) {
			return;
		}

		const row = i + 2;

		const dateProperty = page.properties[t('date')];
		const fromProperty = page.properties[t('currency')];
		const toProperty = page.properties[t('accountCurrency')];

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
							[t('exchangeRate')]: { number: rate },
						},
					},
				};
			}
			return null;
		})
		.filter((update): update is NonNullable<typeof update> => update != null);

	if (updates.length > 0) {
		assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

		const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
		notion.updateAll(updates);
		Logger.log(`${updates.length}개의 환율이 노션에 업데이트되었어요.`);
	}
	clearSheet(sheetName);
}
