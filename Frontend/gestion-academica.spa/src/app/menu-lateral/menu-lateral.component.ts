import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [ RouterModule,TableComponent ],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {}
