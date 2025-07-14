import type { NotionPropertyName } from '@clarity-suite/notion';
import { RealtimeGoogleFinanceProperty } from 'services/_shared/sheet';

export const CURRENCY_DATA: [
	NotionPropertyName,
	RealtimeGoogleFinanceProperty,
][] = [['Exchange Rate', '']];
