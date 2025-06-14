import { PageObjectResponse } from '@notionhq/client';

export interface BatchData {
  id: string;
  name: string;
  [key: string]: any;
}

export interface BatchConfig<T extends BatchData> {
  getPages: (notionDbId: string) => { results: PageObjectResponse[] };
  calcData: (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, name: string) => void;
  updateNotion: (pageId: string, data: T) => Promise<void>;
  getDataFromSheet: (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, name: string) => T | null;
  getDataColumnCount: number;
  titlePropertyName: string;
}
