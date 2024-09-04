export interface YahooFinanceResponse {
  chart: Chart;
}

export interface Chart {
  result: Result[];
  error: any;
}

export interface Result {
  meta: Meta;
  timestamp: number[];
  indicators: Indicators;
}

export interface Meta {
  currency: string;
  symbol: string;
  exchangeName: string;
  fullExchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  hasPrePostMarketData: boolean;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  longName: string;
  shortName: string;
  chartPreviousClose: number;
  previousClose: number;
  scale: number;
  priceHint: number;
  currentTradingPeriod: TradingPeriod;
  tradingPeriods: TradingPeriodDetails[][];
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface TradingPeriod {
  pre: TradingSession;
  regular: TradingSession;
  post: TradingSession;
}

export interface TradingSession {
  timezone: string;
  end: number;
  start: number;
  gmtoffset: number;
}

export interface TradingPeriodDetails {
  timezone: string;
  end: number;
  start: number;
  gmtoffset: number;
}

export interface Indicators {
  quote: Quote[];
}

export interface Quote {
  low: number[];
  high: number[];
  close: number[];
  open: number[];
  volume: number[];
}
