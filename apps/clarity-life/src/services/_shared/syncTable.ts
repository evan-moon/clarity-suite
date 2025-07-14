import { isFullPage } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client';
import { clearSheet, getSheet } from 'services/_shared/sheet';
import {
	createNotionClient,
	getTitleText,
	isFullPageWithId,
} from '@clarity-suite/notion';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';

import { assertEnv } from '@clarity-suite/utils';

interface Config {
	getPages: (notionDbId: string) => { results: PageObjectResponse[] };
	calcData: (
		sheet: GoogleAppsScript.Spreadsheet.Sheet,
		row: number,
		name: string,
	) => void;
	getDataFromSheet: (
		sheet: GoogleAppsScript.Spreadsheet.Sheet,
		row: number,
		name: string,
	) => { properties: Record<string, any> } | null;
	getDataColumnCount: number;
	titlePropertyName: string;
}

export function syncTable(
	sheetName: string,
	notionDbId: string,
	config: Config,
) {
	const sheet = getSheet(sheetName);
	if (sheet == null) {
		Logger.log(`${sheetName} 시트가 존재하지 않습니다.`);
		return;
	}

	const allPages = config.getPages(notionDbId);
	const processedItems = new Set<string>();

	allPages.results.forEach((page, index) => {
		if (isFullPage(page) === false) {
			return;
		}

		const name = getTitleText(page.properties[config.titlePropertyName]);
		if (!processedItems.has(name)) {
			config.calcData(sheet, index + 1, name);
			processedItems.add(name);
			Logger.log(`${name} 정보가 시트에 입력되었어요.`);
		}
	});

	SpreadsheetApp.flush();
	Logger.log(`모든 정보가 시트에서 계산되었어요.`);

	const updates = allPages.results
		.filter(isFullPageWithId)
		.map((page) => {
			const name = getTitleText(page.properties[config.titlePropertyName]);
			const data = config.getDataFromSheet(
				sheet,
				allPages.results.indexOf(page) + 1,
				name,
			);
			Logger.log(`${name}의 계산된 데이터를 가져왔어요`);
			return data != null ? { pageId: page.id, data } : null;
		})
		.filter((update): update is NonNullable<typeof update> => update != null);

	if (updates.length > 0) {
		assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

		const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
		notion.updateAll(updates);
		Logger.log(`${updates.length}개의 데이터가 노션에 업데이트되었어요.`);

		clearSheet(sheetName);
	}
}
