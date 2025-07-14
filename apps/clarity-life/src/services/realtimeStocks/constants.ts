import type { NotionPropertyName } from '@clarity-suite/notion';
import { RealtimeGoogleFinanceProperty } from 'services/_shared/sheet';

export const STOCK_DATA: [NotionPropertyName, RealtimeGoogleFinanceProperty][] =
	[
		['종목명', 'name'],
		['현재가', 'price'],
		['전일종가', 'closeyest'],
		['변동', 'changepct'],
		['52주최고가', 'high52'],
		['52주최저가', 'low52'],
		['PE', 'pe'],
		['EPS', 'eps'],
		['시가총액', 'marketcap'],
	];
