import { I18nConfig } from './types';

export const koConfig: I18nConfig = {
  language: 'ko',
  properties: {
    name: '이름',
    title: '제목',

    // Currency properties
    currencyName: '환율이름',
    baseCurrency: '기준통화',
    targetCurrency: '대상통화',
    exchangeRate: '환율',

    // Stock properties
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

    // Transaction properties
    date: '날짜',
    transactionCurrency: '거래통화',
    transactionTargetCurrency: '대상통화',
    exchangeRateAuto: '환율 (자동입력)',
  },
};

export const enConfig: I18nConfig = {
  language: 'en',
  properties: {
    name: 'Name',
    title: 'Title',

    // Currency properties
    currencyName: 'Currency Name',
    baseCurrency: 'Base Currency',
    targetCurrency: 'Target Currency',
    exchangeRate: 'Exchange Rate',

    // Stock properties
    ticker: 'Ticker',
    stockName: 'Stock Name',
    currentPrice: 'Current Price',
    previousClose: 'Previous Close',
    change: 'Change',
    yearHigh: '52 Week High',
    yearLow: '52 Week Low',
    pe: 'PE',
    eps: 'EPS',
    dividendYield: 'Dividend Yield',

    // Transaction properties
    date: 'Date',
    transactionCurrency: 'Transaction Currency',
    transactionTargetCurrency: 'Target Currency',
    exchangeRateAuto: 'Exchange Rate (Auto)',
  },
};
