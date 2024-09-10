import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutsComponent } from './layouts/auth-layouts/auth-layouts.component';
import { TwoFactorAuthenticationComponent } from './pages/two-factor-authentication/two-factor-authentication.component';
import { isAuthenticatedGuard } from './guards';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutsComponent,
    children : [
      {path: 'login', component: LoginPageComponent},
      {path: 'tfa-authentication', component: TwoFactorAuthenticationComponent},
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },

];
