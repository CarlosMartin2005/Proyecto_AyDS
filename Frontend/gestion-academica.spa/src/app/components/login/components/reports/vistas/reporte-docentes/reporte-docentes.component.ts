import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-reporte-docentes',
  standalone: true,
  imports: [HttpClientModule, ButtonGoBackComponent, TableComponent],
  templateUrl: './reporte-docentes.component.html',
  styleUrl: './reporte-docentes.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteDocentesComponent implements OnInit {
  userReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'email', label: 'Correo' },
    { key: 'especialidad', label: 'Curso Impartido' },
    { key: 'activo', label: 'Estado' },
  ];

  docentes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/reportes/docentes').subscribe((data: any) => {
      this.docentes = data.map((docente: any, index: number) => {
        return {
          index: index + 1,
          ...docente,
          activo: docente.status === 'A' ? 'Activo' : 'Inactivo'
        };
      });
    });
  }
}
