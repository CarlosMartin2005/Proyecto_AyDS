import { Component } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-01',
  standalone: true,
  imports: [RouterModule, TableComponent, RouterLink],
  templateUrl: './report-01.component.html',
  styleUrl: './report-01.component.scss',
})
export class Report01Component {
  userReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'clave', label: 'Clave' },
    { key: 'activo', label: 'Activo' },
    { key: 'acciones', label: 'Acciones' },
  ];

  salesReportColumns = [
    { key: 'index', label: '#' },
    { key: 'producto', label: 'Producto' },
    { key: 'cantidad', label: 'Cantidad' },
    { key: 'precio', label: 'Precio' },
    { key: 'total', label: 'Total' },
    { key: 'acciones', label: 'Acciones' },
  ];
}
