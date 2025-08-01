import { STOCK_DATA } from './constants';
import { calcStockData, getAllStockPages } from './utils';
import { syncTable } from 'services/_shared/syncTable';

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
					티커: {
						title: [{ text: { content: data[0] } }],
					},
					종목명: {
						rich_text: [
							{
								text: {
									content: data[1],
								},
							},
						],
					},
					현재가: {
						number: parseFloat(data[2]),
					},
					전일종가: {
						number: parseFloat(data[3]),
					},
					전일대비: {
						number: parseFloat(data[4]) / 100,
					},
					'52주 최고가': {
						number: parseFloat(data[5]),
					},
					'52주 최저가': {
						number: parseFloat(data[6]),
					},
					PE: {
						number: parseFloat(data[7]),
					},
					EPS: {
						number: parseFloat(data[8]),
					},
					시가총액: {
						number: parseFloat(data[9]),
					},
				},
			};
		},
		getDataColumnCount: STOCK_DATA.length + 1,
		titlePropertyName: '티커',
	});
}
