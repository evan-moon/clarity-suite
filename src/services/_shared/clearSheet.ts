import { getSheet } from '../../sheet';

export function clearSheet(sheetName: string) {
  const sheet = getSheet(sheetName);
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  if (lastRow > 0) {
    sheet.deleteRows(1, lastRow);
  }
  // 남아있는 셀 값도 모두 비움 (포맷, 값 등)
  const lastCol = sheet.getLastColumn();
  if (lastCol > 0 && lastRow > 0) {
    sheet.getRange(1, 1, lastRow, lastCol).clearContent();
  }
}
