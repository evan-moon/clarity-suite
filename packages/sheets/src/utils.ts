export function getSheet(sheetName: string) {
	return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

export function clearSheet(sheetName: string) {
	const sheet = getSheet(sheetName);
	if (!sheet) return;
	const lastRow = sheet.getLastRow();
	if (lastRow > 0) {
		sheet.deleteRows(1, lastRow);
	}

	const lastCol = sheet.getLastColumn();
	if (lastCol > 0 && lastRow > 0) {
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
