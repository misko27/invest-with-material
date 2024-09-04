import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  private stockService = inject(StockService);

  displayedColumns: string[] = [
    'instrument',
    'position',
    'marketValue',
    'avgPrice',
    'unrealizedPL',
  ];
  portfolioData = [
    {
      instrument: 'BABA',
      position: 140,
      marketValue: 0,
      avgPrice: 74.96,
      unrealizedPL: 0,
    },
    {
      instrument: 'VWCE.DE',
      position: 31,
      marketValue: 0,
      avgPrice: 94.79,
      unrealizedPL: 0,
    },
    {
      instrument: 'KWEB.L',
      position: 200,
      marketValue: 0,
      avgPrice: 19.74,
      unrealizedPL: 0,
    },
    {
      instrument: 'BABA',
      position: 120,
      marketValue: 0,
      avgPrice: 119,
      unrealizedPL: 0,
    },
  ];

  totalMarketValue: number = 0;
  totalUnrealizedPL: number = 0;

  ngOnInit(): void {
    this.loadStockData();
  }

  loadStockData() {
    this.portfolioData.forEach((stock, index) => {
      this.stockService.getStockData(stock.instrument).subscribe({
        next: (data) => {
          this.portfolioData[index].marketValue =
            data.currentPrice * stock.position;
          this.portfolioData[index].unrealizedPL =
            this.portfolioData[index].marketValue -
            stock.avgPrice * stock.position;
        },
        error: (error) => {
          console.error(`Error fetching data for ${stock.instrument}:`, error);
          // Optionally set default values or handle error
        },
        complete: () => {
          console.log(`Completed fetching data for ${stock.instrument}`);
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
  }
}
