export function getSheet(sheetName: string) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

export type RealtimeGoogleFinanceProperty =
  | ''
  | 'name'
  | 'price'
  | 'priceopen'
  | 'high'
  | 'low'
  | 'volume'
  | 'marketcap'
  | 'tradetime'
  | 'datadelay'
  | 'volumeavg'
  | 'pe'
  | 'eps'
  | 'high52'
  | 'low52'
  | 'change'
  | 'beta'
  | 'changepct'
  | 'closeyest'
  | 'shares';

type PastGoogleFinanceProperty = 'open' | 'close' | 'high' | 'low' | 'volume' | 'all';

export function getGoogleFinanceQuery(cell: string, property: PastGoogleFinanceProperty, date: Date): string;
export function getGoogleFinanceQuery(cell: string, properties: RealtimeGoogleFinanceProperty): string;
export function getGoogleFinanceQuery(
  cell: string,
  property: PastGoogleFinanceProperty | RealtimeGoogleFinanceProperty,
  date?: Date
): string {
  const propretyString = property === '' ? '' : `, "${property}"`;
  if (date == null) {
    return `=iferror(
              googlefinance(${cell}${propretyString})
            , "")`;
  } else {
    return `=iferror(
              index(
                googlefinance(${cell}${propretyString}),
                2,
                2
              )
            , "")`;
  }
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

export function createEveryMinutesBatchTrigger(functionName: string, minutes: 1 | 5 | 10 | 15 | 30) {
  const triggers = ScriptApp.getProjectTriggers();
  const alreadyExists = triggers.some(function (trigger) {
    return trigger.getHandlerFunction() === functionName;
  });

  if (alreadyExists === true) {
    return;
  }

  ScriptApp.newTrigger(functionName).timeBased().everyMinutes(minutes).create();
}

export function createEveryHoursBatchTrigger(functionName: string, hour: 1 | 2 | 4 | 6 | 8 | 12) {
  const triggers = ScriptApp.getProjectTriggers();
  const alreadyExists = triggers.some(function (trigger) {
    return trigger.getHandlerFunction() === functionName;
  });

  if (alreadyExists === true) {
    return;
  }

  ScriptApp.newTrigger(functionName).timeBased().everyHours(hour).create();
}
