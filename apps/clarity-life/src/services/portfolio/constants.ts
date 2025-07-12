type SnapshotDBKey = string;
type OriginDBKey = string;

export const SNAPSHOT_PROPERTY_MAP: Record<SnapshotDBKey, OriginDBKey> = {
  ID: 'Ticker',
  Account: 'Account',
  'Avg Cost': 'Avg Cost',
  'Market Value': 'Market Value',
  Price: 'Price',
  'Price Source': 'Price Source',
  'Profit / Loss': 'Profit / Loss',
  'Return %': 'Return %',
  Shares: 'Shares',
  'Total Cost': 'Total Cost',
  Transactions: 'Transactions',
  Ticker: 'Ticker',
};
