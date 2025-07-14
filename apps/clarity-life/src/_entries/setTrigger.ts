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
		createEveryHoursBatchTrigger('updateRealtimeServices', 1);
		createEveryMonthBatchTrigger('takeAccountHubSnapshots', {
			month: 28,
			hour: 5,
		});
		createEveryMonthBatchTrigger('takePortfolioSnapshots', {
			month: 28,
			hour: 5,
		});
	} else if (isClarityCreatorKit()) {
		createEveryHoursBatchTrigger('updateRealtimeServices', 1);
	}
}

setTrigger();
