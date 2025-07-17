import {
	isClarityCreatorKit,
	isClarityLife,
} from 'services/_shared/appsScriptProperties';
import {
	createEveryHoursBatchTrigger,
	createEveryMonthBatchTrigger,
} from '@clarity-suite/sheets';

function setTrigger() {
	if (isClarityLife()) {
		createEveryHoursBatchTrigger('syncTransactionsCurrencies', 1);
		createEveryHoursBatchTrigger('syncRealtimeCurrencies', 1);
		createEveryHoursBatchTrigger('syncRealtimeStocks', 1);
		createEveryMonthBatchTrigger('takeAccountHubSnapshots', {
			month: 28,
			hour: 5,
		});
		createEveryMonthBatchTrigger('takePortfolioSnapshots', {
			month: 28,
			hour: 5,
		});
	} else if (isClarityCreatorKit()) {
		createEveryHoursBatchTrigger('syncRealtimeCurrencies', 1);
		createEveryHoursBatchTrigger('syncRealtimeStocks', 1);
	}
}

setTrigger();
