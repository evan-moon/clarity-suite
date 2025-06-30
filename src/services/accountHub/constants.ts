type SnapshotDBKey = string;
type OriginDBKey = string;

export const SNAPSHOT_PROPERTY_MAP: Record<SnapshotDBKey, OriginDBKey> = {
  Type: 'Type',
  Currency: 'Currency',
  Stocks: 'Stocks',
  'Transactions (General)': 'Transactions (General)',
  'Transactions(Investment)': 'Transactions(Investment)',
  Inverted: 'Inverted',
  'Exchange Rate': 'Exchange Rate',
  'Financial Institution': 'Financial Institution',
  'Last Month Balance': 'Last Month Balance',
  'Total Balance': 'Total Balance',
  'Converted Balance': 'Converted Balance',
  Loan: 'Loan',
  'Converted Loan': 'Converted Loan',
  'Net Position': 'Net Position',
  'Converted To': 'Converted To',
  'Current Balance': 'Current Balance',
};
