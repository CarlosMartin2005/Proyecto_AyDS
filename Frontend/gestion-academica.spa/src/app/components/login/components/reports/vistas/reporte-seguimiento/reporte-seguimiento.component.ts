import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
@Component({
  selector: 'app-reporte-seguimiento',
  standalone: true,
  imports: [TableComponent, ButtonGoBackComponent],
  templateUrl: './reporte-seguimiento.component.html',
  styleUrl: './reporte-seguimiento.component.scss'
})
export class ReporteSeguimientoComponent {
  FollowReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'nota', label: 'Nota' },
    { key: 'programa', label: 'Programa' },
    { key: 'curso', label: 'Curso' },
    { key: 'activo', label: 'Activo' },
    { key: 'acciones', label: 'Acciones' },
  ];
}
