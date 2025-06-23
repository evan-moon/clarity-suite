import { I18nConfig } from './types';

export const koConfig: I18nConfig = {
  language: 'ko',
  properties: {
    name: '이름',
    title: '제목',

    // Realtime Currencies
    currencyName: '환율이름',
    exchangeRate: '환율',

    // Realtime Stocks
    ticker: 'Ticker',
    stockName: '종목명',
    currentPrice: '현재가',
    previousClose: '전일종가',
    change: '변동',
    yearHigh: '52주최고가',
    yearLow: '52주최저가',
    pe: 'PE',
    eps: 'EPS',
    dividendYield: '배당률',

    // Tradebook
    date: '날짜',
    tradeCurrency: '거래통화',
    accountCurrency: '대상통화',
    currency: '통화',
  },
};

export const enConfig: I18nConfig = {
  language: 'en',
  properties: {
    name: 'Name',
    title: 'Title',

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
