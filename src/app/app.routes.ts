import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth.routes';
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';
import { DashboardLayoutComponent } from './dashboard/layouts/dashboardLayout/dashboardLayout.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    children: AUTH_ROUTES,
  },
  {
    path: 'home',
    component: DashboardLayoutComponent,
    // canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/pages/homepage/homepage.component')
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./presentation/pages/userPage/userPage.component')
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
