import { Component } from '@angular/core';

@Component({
  selector: 'app-cuenta-inactiva',
  standalone: true,
  imports: [],
  templateUrl: './cuenta-inactiva.component.html',
  styleUrl: './cuenta-inactiva.component.scss'
})
export class CuentaInactivaComponent {
  nombre: any;

  constructor() {
    this.nombre = localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido');
  }
}
