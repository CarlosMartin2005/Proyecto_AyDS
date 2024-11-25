import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-reporte-seguimiento',
  standalone: true,
  imports: [HttpClientModule, TableComponent, ButtonGoBackComponent],
  templateUrl: './reporte-seguimiento.component.html',
  styleUrl: './reporte-seguimiento.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteSeguimientoComponent implements OnInit {
  FollowReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'email', label: 'Correo' },
    { key: 'programa', label: 'Programa' },
    { key: 'curso', label: 'Curso' },
    { key: 'nota', label: 'Nota' },
    { key: 'activo', label: 'Estado' }
  ];

  seguimiento: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/reportes/seguimiento').subscribe((data: any) => {
      this.seguimiento = data.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item,
          activo: item.activo === 'A' ? 'Activo' : 'Inactivo'
        };
      });
    });
  }
}