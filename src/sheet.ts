export function getSheet(sheetName: string) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

export type RealtimeGoogleFinanceProperty =
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
  | 'shares'
  | '통화';

type PastGoogleFinanceProperty = 'open' | 'close' | 'high' | 'low' | 'volume' | 'all';

export function getGoogleFinanceQuery(cell: string, property: PastGoogleFinanceProperty, date: Date): string;
export function getGoogleFinanceQuery(cell: string, properties: RealtimeGoogleFinanceProperty): string;
export function getGoogleFinanceQuery(
  cell: string,
  properties: PastGoogleFinanceProperty | RealtimeGoogleFinanceProperty,
  date?: Date
): string {
  if (date == null) {
    return `=iferror(
              googlefinance(${cell}, "${properties}")
            , "")`;
  } else {
    return `=iferror(
              index(
                googlefinance(${cell}, "${properties}"),
                2,
                2
              )
            , "")`;
  }
}
