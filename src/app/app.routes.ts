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
    component: InvestCalcComponent, // Main component, protected by isAuthenticated
    canActivate: [isAuthenticated], // Protect this route with the auth guard
  },
  {
    path: 'login',
    component: LoginComponent, // Login route, accessible without authentication
  },
  {
    path: '**',
    redirectTo: '', // Catch-all for unmatched routes
  },
];
