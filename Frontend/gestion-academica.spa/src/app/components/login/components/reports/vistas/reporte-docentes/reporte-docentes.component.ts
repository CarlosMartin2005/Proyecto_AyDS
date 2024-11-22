import { Component } from '@angular/core';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-reporte-docentes',
  standalone: true,
  imports: [ButtonGoBackComponent, TableComponent],
  templateUrl: './reporte-docentes.component.html',
  styleUrl: './reporte-docentes.component.scss'
})
export class ReporteDocentesComponent {
  userReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'clave', label: 'Cursos Impartidos' },
    { key: 'activo', label: 'Correo ' },
    { key: 'clave', label: 'Telefono' },
    { key: 'acciones', label: '' },
  ];

}
