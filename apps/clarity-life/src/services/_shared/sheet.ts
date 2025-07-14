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

type PastGoogleFinanceProperty =
	| 'open'
	| 'close'
	| 'high'
	| 'low'
	| 'volume'
	| 'all';

export function getGoogleFinanceQuery(
	cell: string,
	property: PastGoogleFinanceProperty,
	date: Date,
): string;
export function getGoogleFinanceQuery(
	cell: string,
	properties: RealtimeGoogleFinanceProperty,
): string;
export function getGoogleFinanceQuery(
	cell: string,
	property: PastGoogleFinanceProperty | RealtimeGoogleFinanceProperty,
	date?: Date,
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
