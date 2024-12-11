import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  nombre: any;

  constructor() {
    this.nombre = localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido');
  }
}
