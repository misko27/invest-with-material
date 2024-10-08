import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { YahooFinanceResponse } from '../inverfaces/yahoo.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private http = inject(HttpClient);
  private baseUrl = environment.yahooApiBaseUrl;

  constructor() {}

  getStockData(symbol: string): Observable<any> {
    const yahooUrl = `${this.baseUrl}/v8/finance/chart/${symbol}`;
    console.log('API URL:', yahooUrl);
    return this.http.get<YahooFinanceResponse>(yahooUrl).pipe(
      map((data: YahooFinanceResponse) => {
        console.log('API response:', data); // Log incoming data

        if (data?.chart?.result?.[0]) {
          const result = data.chart.result[0];
          return {
            symbol: result.meta.symbol,
            currentPrice: result.meta.regularMarketPrice,
            fiftyTwoWeekHigh: result.meta.fiftyTwoWeekHigh,
            fiftyTwoWeekLow: result.meta.fiftyTwoWeekLow,
            regularMarketDayHigh: result.meta.regularMarketDayHigh,
            regularMarketDayLow: result.meta.regularMarketDayLow,
            regularMarketVolume: result.meta.regularMarketVolume,
            longName: result.meta.longName,
          };
        }
        throw new Error('Invalid data structure');
      }),
      catchError((error) => {
        console.error(`Failed to fetch data for ${symbol}`, error);
        console.log('Full error response:', error);
        return throwError(() => error);
      })
    );
  }
}
