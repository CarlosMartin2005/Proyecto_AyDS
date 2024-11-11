import { Component } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-03',
  standalone: true,
  imports: [RouterModule, TableComponent, RouterLink],
  templateUrl: './report-03.component.html',
  styleUrl: './report-03.component.scss'
})
export class Report03Component {
  ProgramReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombre' },
    { key: 'activo', label: 'Activo' },
    { key: 'acciones', label: 'Acciones' },
  ];
}
