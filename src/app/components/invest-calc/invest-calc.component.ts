import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RegularInvestComponent } from '../regular-invest/regular-invest.component';
import { InvestmentPropertyComponent } from '../investment-property/investment-property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-invest-calc',
  standalone: true,
  imports: [
    MatTabsModule,
    RegularInvestComponent,
    InvestmentPropertyComponent,
    PortfolioComponent,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './invest-calc.component.html',
  styleUrl: './invest-calc.component.scss',
})
export class InvestCalcComponent {
  authService = inject(AuthService);
  router = inject(Router);
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']); // Redirect to login page after sign-out
      },
      error: (err) => {
        console.error('Logout failed:', err);
      },
    });
  }

  get userEmail(): string {
    return this.authService.getUserEmail() ?? 'Guest';
  }
}
