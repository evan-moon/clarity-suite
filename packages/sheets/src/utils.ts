export function getSheet(sheetName: string) {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
	if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);
	return sheet;
}

export function clearSheet(sheetName: string) {
	const sheet = getSheet(sheetName);
	const lastRow = sheet.getLastRow();
	const lastCol = sheet.getLastColumn();

	if (lastRow > 0 && lastCol > 0) {
		sheet.getRange(1, 1, lastRow, lastCol).clearContent();
	}
}

const isExistTrigger = (
	triggers: GoogleAppsScript.Script.Trigger[],
	functionName: string,
) => triggers.some((trigger) => trigger.getHandlerFunction() === functionName);

export function createEveryHoursBatchTrigger(
	functionName: string,
	hour: 1 | 2 | 4 | 6 | 8 | 12,
) {
	const triggers = ScriptApp.getProjectTriggers();

	if (isExistTrigger(triggers, functionName) === true) {
		return;
	}

	ScriptApp.newTrigger(functionName).timeBased().everyHours(hour).create();
}

export function createEveryDaysBatchTrigger(
	functionName: string,
	hour: number,
) {
	const triggers = ScriptApp.getProjectTriggers();

	if (isExistTrigger(triggers, functionName) === true) {
		return;
	}

	ScriptApp.newTrigger(functionName)
		.timeBased()
		.everyDays(1)
		.atHour(hour)
		.create();
}

export function createEveryMonthBatchTrigger(
	functionName: string,
	{ month, hour }: { month: number; hour: number },
) {
	const triggers = ScriptApp.getProjectTriggers();

	if (isExistTrigger(triggers, functionName) === true) {
		return;
	}

	ScriptApp.newTrigger(functionName)
		.timeBased()
		.onMonthDay(month)
		.atHour(hour)
		.create();
}
