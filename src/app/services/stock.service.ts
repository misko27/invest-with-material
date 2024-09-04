import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { YahooFinanceResponse } from '../inverfaces/yahoo.interface';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private http = inject(HttpClient);
  private yahooFinanceApiUrl =
    'https://query1.finance.yahoo.com/v8/finance/chart/';

  constructor() {}

  getStockData(symbol: string): Observable<any> {
    const yahooUrl = `/yahoo-api/v8/finance/chart/${symbol}`;
    return this.http.get<YahooFinanceResponse>(yahooUrl).pipe(
      map((data: YahooFinanceResponse) => {
        const result = data.chart.result[0];
        const currentPrice = result.meta.regularMarketPrice;
        return {
          symbol: result.meta.symbol,
          currentPrice: currentPrice,
          fiftyTwoWeekHigh: result.meta.fiftyTwoWeekHigh,
          fiftyTwoWeekLow: result.meta.fiftyTwoWeekLow,
          regularMarketDayHigh: result.meta.regularMarketDayHigh,
          regularMarketDayLow: result.meta.regularMarketDayLow,
          regularMarketVolume: result.meta.regularMarketVolume,
          longName: result.meta.longName,
        };
      }),
      catchError((error) => {
        console.error(`Failed to fetch data for ${symbol}`, error);
        return throwError(() => error);
      })
    );
  }
}
