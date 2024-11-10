import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',
    component: MenuLateralComponent,
    children: [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    {
        path: 'reports',
        loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent),

        // Sub-routes de Reports

        children: [
          { path: 'tabla', component: TableComponent },
          {
            path: 'report1',
            loadComponent: () => import('./components/reports/report-01/report-01.component').then(m => m.Report01Component)
          },
          {
            path: 'report2',
            loadComponent: () => import('./components/reports/report-02/report-02.component').then(m => m.Report02Component)
          },
          {
            path: 'report3',
            loadComponent: () => import('./components/reports/report-03/report-03.component').then(m => m.Report03Component)
          },
          {
            path: 'report4',
            loadComponent: () => import('./components/reports/report-04/report-04.component').then(m => m.Report04Component)
          },
          {
            path: 'report5',
            loadComponent: () => import('./components/reports/report-05/report-05.component').then(m => m.Report05Component)
          },
          {
            path: 'report6',
            loadComponent: () => import('./components/reports/report-06/report-06.component').then(m => m.Report06Component)
          },
          {
            path: 'report7',
            loadComponent: () => import('./components/reports/report-07/report-07.component').then(m => m.Report07Component)
          },
          {
            path: 'report8',
            loadComponent: () => import('./components/reports/report-08/report-08.component').then(m => m.Report08Component)
          },
        ]
      }

  ]},
];
