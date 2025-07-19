type SnapshotDBKey = string;
type OriginDBKey = string;

export const SNAPSHOT_PROPERTY_MAP: Record<SnapshotDBKey, OriginDBKey> = {
	Company: '종목명',
	Sector: '섹터',
	Industry: '산업',
	'Return %': '수익률',
	Account: '계좌',
	'Price Source': '티커',
	Shares: '보유주수',
	'Avg Cost': '평단가',
	'Total Cost': '총매수금액 (USD)',
	'Total Cost (Custom)': '총매수금액 (표시통화)',
	Transactions: '거래내역',
	Price: '현재가',
	'Price (Custom)': '현재가 (표시통화)',
	'Profit / Loss': '수익',
	'Profit / Loss (Custom)': '수익 (표시통화)',
	'Market Value': '평가금액',
	'Market Value (Custom)': '평가금액 (표시통화)',
	'Display Currency': '표시통화',
	'Display Exchange Rate': '표시환율',
};
