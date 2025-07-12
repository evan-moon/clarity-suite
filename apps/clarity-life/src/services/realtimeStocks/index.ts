import { STOCK_DATA } from './constants';
import { calcStockData, getAllStockPages } from './utils';
import { syncTable } from 'services/_shared/syncTable';
import { t } from 'services/_shared/i18n';

export function syncRealtimeStocks(sheetName: string, notionDbId: string) {
	syncTable(sheetName, notionDbId, {
		getPages: (notionDbId) => getAllStockPages(notionDbId),
		calcData: calcStockData,
		getDataFromSheet: (sheet, row, name) => {
			const result = sheet
				.getRange(row, 1, sheet.getLastRow() - 1, STOCK_DATA.length + 1)
				.getValues();
			const data = result.find((row) => row[0] === name);
			if (data == null) return null;

			return {
				properties: {
					[t('ticker')]: {
						title: [{ text: { content: data[0] } }],
					},
					[t('stockName')]: {
						rich_text: [
							{
								text: {
									content: data[1],
								},
							},
						],
					},
					[t('currentPrice')]: {
						number: parseFloat(data[2]),
					},
					[t('previousClose')]: {
						number: parseFloat(data[3]),
					},
					[t('change')]: {
						number: parseFloat(data[4]) / 100,
					},
					[t('yearHigh')]: {
						number: parseFloat(data[5]),
					},
					[t('yearLow')]: {
						number: parseFloat(data[6]),
					},
					[t('pe')]: {
						number: parseFloat(data[7]),
					},
					[t('eps')]: {
						number: parseFloat(data[8]),
					},
				},
			};
		},
		getDataColumnCount: STOCK_DATA.length + 1,
		titlePropertyName: t('ticker'),
	});
}
