import { PageObjectResponse } from '@notionhq/client';

export interface BatchData {
  id: string;
  name: string;
  [key: string]: any;
}

export interface BatchConfig<T extends BatchData> {
  getPages: (notionDbId: string) => { results: PageObjectResponse[] };
  calcData: (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, name: string) => void;
  getDataFromSheet: (
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    row: number,
    name: string
  ) => { properties: Record<string, any> } | null;
  getDataColumnCount: number;
  titlePropertyName: string;
}
