import { SCRIPT_PROPERTIES_MAP, DATABASE_PROPERTIES } from './constants';
import { findDatabaseId, isValidScriptProperty } from './utils';

export function applySettingsFromSheet(): void {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Setting');
  if (!sheet) {
    SpreadsheetApp.getUi().alert('⚠️ "Setting" sheet not found.');
    return;
  }

  const last = sheet.getLastRow();
  const values = sheet.getRange(2, 1, last - 1, 2).getValues() as string[][];

  const rawProps: Record<string, string> = {};
  values.forEach(([name, value]) => {
    const trimmedName = name.trim();
    if (isValidScriptProperty(trimmedName)) {
      const key = SCRIPT_PROPERTIES_MAP[trimmedName];
      rawProps[key] = String(value).trim();
    }
  });

  const notionSecret = rawProps['NOTION_SECRET'];
  if (!notionSecret) {
    SpreadsheetApp.getUi().alert('⚠️ Please enter Notion token first.');
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
    SpreadsheetApp.getActiveSpreadsheet().toast('✅ Successfully connected to Notion', 'Complete', 5);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An unknown error occurred.';
    SpreadsheetApp.getUi().alert(`❌ ${message}`);
  }
}
