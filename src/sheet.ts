export function getSheet(sheetName: string) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}
