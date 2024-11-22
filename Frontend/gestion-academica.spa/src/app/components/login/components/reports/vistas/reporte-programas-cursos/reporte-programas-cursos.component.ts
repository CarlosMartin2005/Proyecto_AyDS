import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';

@Component({
  selector: 'app-reporte-programas-cursos',
  standalone: true,
  imports: [ButtonGoBackComponent, TableComponent],
  templateUrl: './reporte-programas-cursos.component.html',
  styleUrl: './reporte-programas-cursos.component.scss'
})
export class ReporteProgramasCursosComponent {
  ProgramReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'programas', label: 'Programas' },
    { key: 'cursos', label: 'Cursos' },
    { key: 'horarios', label: 'Horarios' },
    { key: 'activo', label: 'Activo' },
    { key: 'acciones', label: 'Acciones' }
  ];
}
