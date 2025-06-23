export type Language = 'ko' | 'en';

export interface I18nConfig {
  language: Language;
  properties: {
    // Common properties
    name: string;
    title: string;

    // Currency properties
    currencyName: string;
    exchangeRate: string;

    // Stock properties
    ticker: string;
    stockName: string;
    currentPrice: string;
    previousClose: string;
    change: string;
    yearHigh: string;
    yearLow: string;
    pe: string;
    eps: string;
    dividendYield: string;

    // Transaction properties
    date: string;
    tradeCurrency: string;
    accountCurrency: string;
    currency: string;
  };
}
