import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MenuLateralComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'report', component: TableComponent },
    { path: 'home', component: HomeComponent }
  ]},
];
