import {
	createEveryHoursBatchTrigger,
	createEveryMonthBatchTrigger,
} from '@clarity-suite/sheets';

function setTrigger() {
	createEveryHoursBatchTrigger('syncTransactionsCurrencies', 1);
	createEveryHoursBatchTrigger('syncRealtimeCurrencies', 1);
	createEveryHoursBatchTrigger('syncRealtimeStocks', 1);
	createEveryMonthBatchTrigger('takePortfolioSnapshots', {
		month: 28,
		hour: 5,
	});

	SpreadsheetApp.getActiveSpreadsheet().toast(
		'✅ 트리거가 성공적으로 설정되었어요.',
		'완료',
		5,
	);
}

setTrigger();
