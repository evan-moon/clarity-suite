import { syncTable } from 'services/_shared/syncTable';
import { CURRENCY_DATA } from './constants';
import { calcCurrencyData, getAllCurrencyPages } from './utils';

export function syncRealtimeCurrencies(sheetName: string, notionDbId: string) {
	syncTable(sheetName, notionDbId, {
		getPages: (notionDbId) => getAllCurrencyPages(notionDbId),
		calcData: calcCurrencyData,
		getDataFromSheet: (sheet, row, name) => {
			const result = sheet
				.getRange(row, 1, sheet.getLastRow() - 1, CURRENCY_DATA.length + 3)
				.getValues();
			const data = result.find((row) => row[0] === name);
			if (data == null) return null;

			return {
				properties: {
					환율: {
						number: parseFloat(data[1]),
					},
				},
			};
		},
		getDataColumnCount: CURRENCY_DATA.length + 3,
		titlePropertyName: '이름',
	});
}
