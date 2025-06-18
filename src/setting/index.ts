import { 스크립트속성, DATABASE_PROPERTIES } from './constants';
import { findDatabaseId, isValidScriptProperty } from './utils';

export function applySettingsFromSheet(): void {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Setting');
  if (!sheet) {
    SpreadsheetApp.getUi().alert('⚠️ "Setting" 시트를 찾을 수 없습니다.');
    return;
  }

  const last = sheet.getLastRow();
  const values = sheet.getRange(2, 1, last - 1, 2).getValues() as string[][];

  const rawProps: Record<string, string> = {};
  values.forEach(([name, value]) => {
    const trimmedName = name.trim();
    if (isValidScriptProperty(trimmedName)) {
      const key = 스크립트속성[trimmedName];
      rawProps[key] = String(value).trim();
    }
  });

  const notionSecret = rawProps['NOTION_SECRET'];
  if (!notionSecret) {
    SpreadsheetApp.getUi().alert('⚠️ Notion 토큰을 먼저 입력해주세요.');
    return;
  }

  try {
    const finalProps: Record<string, string> = { NOTION_SECRET: notionSecret };
    DATABASE_PROPERTIES.forEach(key => {
      const val = rawProps[key];
      if (!val) return;
      finalProps[key] = findDatabaseId(notionSecret, val);
    });

    PropertiesService.getScriptProperties().setProperties(finalProps, true);
    SpreadsheetApp.getActiveSpreadsheet().toast('✅ 노션과 성공적으로 연동되었습니다', '완료', 5);
  } catch {
    SpreadsheetApp.getActiveSpreadsheet().toast('❌ 노션 연동 중 오류가 발생했습니다', '오류', 5);
  }
}
