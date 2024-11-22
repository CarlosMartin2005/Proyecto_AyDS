import { Component } from '@angular/core';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-reporte-estudiantes',
  standalone: true,
  imports: [ButtonGoBackComponent, TableComponent],
  templateUrl: './reporte-estudiantes.component.html',
  styleUrl: './reporte-estudiantes.component.scss'
})
export class ReporteEstudiantesComponent {
  userReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'clave', label: 'Clase' },
    { key: 'activo', label: 'Correo' },
    { key: 'activo', label: 'Telefono' },
    { key: 'activo', label: 'Direccion' },
    { key: 'acciones', label: '' },
  ];
}
