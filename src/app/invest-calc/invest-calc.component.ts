import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RegularInvestComponent } from '../regular-invest/regular-invest.component';
import { InvestmentPropertyComponent } from '../investment-property/investment-property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-invest-calc',
  standalone: true,
  imports: [
    MatTabsModule,
    RegularInvestComponent,
    InvestmentPropertyComponent,
    PortfolioComponent,
  ],
  templateUrl: './invest-calc.component.html',
  styleUrl: './invest-calc.component.scss',
})
export class InvestCalcComponent {
  ngOnInit() {}
}
