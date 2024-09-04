import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { StockService } from '../services/stock.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MatTableModule, CommonModule, NgxChartsModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  private stockService = inject(StockService);

  displayedColumns: string[] = [
    'instrument',
    'currentPrice',
    'position',
    'marketValue',
    'avgPrice',
    'unrealizedPL',
    'percentagePL',
    'regularMarketDayHigh',
    'regularMarketDayLow',
    'fiftyTwoWeekHigh',
    'fiftyTwoWeekLow',
    'volume',
  ];

  portfolioData = [
    {
      instrument: 'BABA',
      stock: 'BABA_IB',
      currentPrice: 0,
      position: 140,
      marketValue: 0,
      avgPrice: 74.96,
      unrealizedPL: 0,
      percentagePL: 0,
      regularMarketDayHigh: 0,
      regularMarketDayLow: 0,
      fiftyTwoWeekHigh: 0,
      fiftyTwoWeekLow: 0,
      volume: 0,
    },
    {
      instrument: 'VWCE.DE',
      stock: 'VWCE_IB',
      currentPrice: 0,
      position: 31,
      marketValue: 0,
      avgPrice: 94.79,
      unrealizedPL: 0,
      percentagePL: 0,
      regularMarketDayHigh: 0,
      regularMarketDayLow: 0,
      fiftyTwoWeekHigh: 0,
      fiftyTwoWeekLow: 0,
      volume: 0,
    },
    {
      instrument: 'KWEB.L',
      stock: 'KWEB_IB',
      currentPrice: 0,
      position: 200,
      marketValue: 0,
      avgPrice: 19.74,
      unrealizedPL: 0,
      percentagePL: 0,
      regularMarketDayHigh: 0,
      regularMarketDayLow: 0,
      fiftyTwoWeekHigh: 0,
      fiftyTwoWeekLow: 0,
      volume: 0,
    },
    {
      instrument: 'BABA',
      stock: 'BABA_ETORO',
      currentPrice: 0,
      position: 120,
      marketValue: 0,
      avgPrice: 119,
      unrealizedPL: 0,
      percentagePL: 0,
      regularMarketDayHigh: 0,
      regularMarketDayLow: 0,
      fiftyTwoWeekHigh: 0,
      fiftyTwoWeekLow: 0,
      volume: 0,
    },
  ];

  totalMarketValue: number = 0;
  totalUnrealizedPL: number = 0;
  totalPercentagePL: number = 0;

  // Pie chart data
  pieChartData: any[] = [];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  ngOnInit(): void {
    this.loadStockData();
  }

  loadStockData() {
    this.portfolioData.forEach((stock, index) => {
      this.stockService.getStockData(stock.instrument).subscribe({
        next: (data) => {
          const marketValue = data.currentPrice * stock.position;
          const unrealizedPL = marketValue - stock.avgPrice * stock.position;
          const percentagePL =
            (unrealizedPL / (stock.avgPrice * stock.position)) * 100;

          this.portfolioData[index].marketValue = marketValue;
          this.portfolioData[index].unrealizedPL = unrealizedPL;
          this.portfolioData[index].percentagePL = percentagePL;

          // Additional Yahoo Finance metadata
          this.portfolioData[index].regularMarketDayHigh =
            data.regularMarketDayHigh;
          this.portfolioData[index].regularMarketDayLow =
            data.regularMarketDayLow;
          this.portfolioData[index].fiftyTwoWeekHigh = data.fiftyTwoWeekHigh;
          this.portfolioData[index].fiftyTwoWeekLow = data.fiftyTwoWeekLow;
          this.portfolioData[index].volume = data.regularMarketVolume;
          this.portfolioData[index].currentPrice = data.currentPrice;
        },
        error: (error) => {
          console.error(`Error fetching data for ${stock.instrument}:`, error);
        },
        complete: () => {
          this.calculateTotals();
          this.loadPieChartData();
        },
      });
    });
  }

  calculateTotals() {
    this.totalMarketValue = this.portfolioData.reduce(
      (sum, stock) => sum + stock.marketValue,
      0
    );

    this.totalUnrealizedPL = this.portfolioData.reduce(
      (sum, stock) => sum + stock.unrealizedPL,
      0
    );

    const totalCost = this.portfolioData.reduce(
      (sum, stock) => sum + stock.avgPrice * stock.position,
      0
    );

    // Calculate total percentage P/L based on total cost and total unrealized P/L
    this.totalPercentagePL = (this.totalUnrealizedPL / totalCost) * 100;
  }

  loadPieChartData() {
    // Reset pie chart data
    this.pieChartData = [];

    // Create pie chart data based on marketValue
    this.portfolioData.forEach((stock) => {
      if (stock.marketValue > 0) {
        this.pieChartData.push({
          name: stock.stock,
          value: stock.marketValue,
        });
      }
    });
  }
}
