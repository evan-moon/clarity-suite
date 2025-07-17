import { I18nConfig } from './types';

export const enConfig: I18nConfig = {
	language: 'en',
	properties: {
		name: 'Name',
		title: 'Title',
		status: 'Status',

		// Realtime Currencies
		currencyName: 'Currency Name',
		exchangeRate: 'Exchange Rate',

		// Realtime Stocks
		ticker: 'Ticker',
		stockName: 'Name',
		currentPrice: 'Current Price',
		previousClose: 'Previous Close',
		change: 'Change',
		yearHigh: '52 Week High',
		yearLow: '52 Week Low',
		pe: 'P/E Ratio',
		eps: 'Earnings Per Share (EPS)',
		dividendYield: 'Dividend Yield',

		// Tradebook
		date: 'Date',
		tradeCurrency: 'Trade Currency',
		accountCurrency: 'Account Currency',
		currency: 'Currency',
	},
};
