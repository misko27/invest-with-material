import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './services/auth.service';
import { InvestCalcComponent } from './components/invest-calc/invest-calc.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegularInvestComponent } from './components/regular-invest/regular-invest.component';
import { InvestmentPropertyComponent } from './components/investment-property/investment-property.component';

const isAuthenticated: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const authSrv = inject(AuthService);
  const router = inject(Router);

  // Check if the user is already authenticated
  if (authSrv.isAuthenticated()) {
    return true;
  }

  // Attempt auto-login
  const isAutoLoggedIn = await firstValueFrom(authSrv.autoLogin$());

  // If auto-login fails, navigate to the login page
  if (!isAutoLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

// Define the routes
export const routes: Routes = [
  {
    path: '',
    component: InvestCalcComponent,
    canActivate: [isAuthenticated],
    children: [
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'regular-invest', component: RegularInvestComponent },
      { path: 'investment-property', component: InvestmentPropertyComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '', // Fallback to the default route
  },
];
