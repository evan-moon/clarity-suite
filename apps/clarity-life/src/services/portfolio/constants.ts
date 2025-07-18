type SnapshotDBKey = string;
type OriginDBKey = string;

export const SNAPSHOT_PROPERTY_MAP: Record<SnapshotDBKey, OriginDBKey> = {
	Company: 'Company',
	Sector: 'Sector',
	Industry: 'Industry',
	'Return %': 'Return %',
	Account: 'Account',
	'Price Source': 'Price Source',
	Shares: 'Shares',
	'Avg Cost': 'Avg Cost',
	'Total Cost': 'Total Cost',
	'Total Cost (Custom)': 'Total Cost (Custom)',
	Transactions: 'Transactions',
	Price: 'Price',
	'Price (Custom)': 'Price (Custom)',
	'Profit / Loss': 'Profit / Loss',
	'Profit / Loss (Custom)': 'Profit / Loss (Custom)',
	'Market Value': 'Market Value',
	'Market Value (Custom)': 'Market Value (Custom)',
	'Exchange Source (Display)': 'Exchange Source (Display)',
	'Display Exchange Rate': 'Display Exchange Rate',
};
