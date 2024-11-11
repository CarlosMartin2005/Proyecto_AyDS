import { Component } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-04',
  standalone: true,
  imports: [RouterModule, TableComponent, RouterLink],
  templateUrl: './report-04.component.html',
  styleUrl: './report-04.component.scss'
})
export class Report04Component {
  FollowReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Clase' },
    { key: 'clave', label: 'Nota' },
    { key: 'activo', label: 'Activo' },
    { key: 'acciones', label: 'Acciones' },
  ];
}
