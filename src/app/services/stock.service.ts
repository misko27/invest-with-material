import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private apiKey = 'OKNM6LJ4R0TF7UQ6'; // Replace with your API key
  private apiUrl = 'https://www.alphavantage.co/query';
  private http = inject(HttpClient);

  constructor() {}

  getStockData(symbol: string): Observable<any> {
    const intradayUrl = `${this.apiUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${this.apiKey}`;

    return this.http.get(intradayUrl).pipe(
      map((data: any) => {
        const timeSeries = data['Time Series (5min)'];
        if (!timeSeries) {
          throw new Error('Time series data is unavailable');
        }
        const latestTime = Object.keys(timeSeries)[0];
        return {
          symbol: symbol,
          currentPrice: parseFloat(timeSeries[latestTime]['4. close']),
        };
      }),
      catchError((error) => {
        console.error(
          `Intraday data failed for ${symbol}, trying daily data.`,
          error
        );
        // Try fetching daily data if intraday fails
        return this.getDailyStockData(symbol);
      })
    );
  }

  getDailyStockData(symbol: string): Observable<any> {
    const dailyUrl = `${this.apiUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;

    return this.http.get(dailyUrl).pipe(
      map((data: any) => {
        const timeSeries = data['Time Series (Daily)'];
        if (!timeSeries) {
          throw new Error('Daily time series data is unavailable');
        }
        const latestTime = Object.keys(timeSeries)[0];
        return {
          symbol: symbol,
          currentPrice: parseFloat(timeSeries[latestTime]['4. close']),
        };
      }),
      catchError((error) => {
        console.error(`Failed to fetch daily data for ${symbol}`, error);
        return throwError(error);
      })
    );
  }
}
