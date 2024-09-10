import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: ()=> import("./layouts/dashboardLayout/dashboardLayout.component").then((m)=> m.DashboardLayoutComponent),
    // loadComponent: ()=> import("./layouts/layouts.component").then((m)=> m.LayoutsComponent)
  },
]
