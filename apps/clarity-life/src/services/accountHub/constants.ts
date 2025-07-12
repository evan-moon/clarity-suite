type SnapshotDBKey = string;
type OriginDBKey = string;

export const SNAPSHOT_PROPERTY_MAP: Record<SnapshotDBKey, OriginDBKey> = {
	ID: 'ID',
	'Account Info': 'Account Info',
	Date: 'Date',
	Type: 'Type',
	Currency: 'Currency',
	Inverted: 'Inverted',
	'Exchange Rate': 'Exchange Rate',
	'Financial Institution': 'Financial Institution',
	'Total Balance (USD, Balance + Loan)': 'Total Balance (USD, Balance + Loan)',
	'Balance (USD)': 'Balance (USD)',
	Loan: 'Loan',
	'Loan (USD)': 'Loan (USD)',
	'Net Balance (USD)': 'Net Balance (USD)',
	'Converted To': 'Converted To',
	Balance: 'Balance',
	'Exchange Source': 'Exchange Source',
	'Stocks Market Value': 'Stocks Market Value',
	'Transactions (General)': 'Transactions (General)',
	'Transactions(Investment)': 'Transactions(Investment)',
	'Account Value (USD, Total Balance + Stock Market Value)':
		'Account Value (USD, Total Balance + Stock Market Value)',
};
