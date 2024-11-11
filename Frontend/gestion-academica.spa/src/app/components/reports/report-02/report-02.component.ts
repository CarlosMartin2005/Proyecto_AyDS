import { Component } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-02',
  standalone: true,
  imports: [RouterModule, TableComponent, RouterLink],
  templateUrl: './report-02.component.html',
  styleUrl: './report-02.component.scss'
})
export class Report02Component {
  userReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'clave', label: 'Clave' },
    { key: 'activo', label: 'Activo' },
    { key: 'acciones', label: 'Acciones' },
  ];
}
