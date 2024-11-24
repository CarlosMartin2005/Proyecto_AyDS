import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from './table/table.component';
@Component({
  selector: 'app-reporte-estudiantes',
  standalone: true,
  imports: [HttpClientModule, ButtonGoBackComponent, TableComponent],
  templateUrl: './reporte-estudiantes.component.html',
  styleUrl: './reporte-estudiantes.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteEstudiantesComponent implements OnInit {
  userReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'identidad', label: 'Identidad' },
    { key: 'fecha_de_nacimiento', label: 'Fecha de nacimiento' },
    { key: 'email', label: 'Correo' },
    { key: 'programa', label: 'Programa' },
    { key: 'curso', label: 'Curso' },
    { key: 'horario', label: 'Horario' },
    { key: 'activo', label: 'Estado' },
  ];

  estudiantes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/reportes/estudiantes').subscribe((data: any) => {
      this.estudiantes = data.map((estudiante: any, index: number) => {
        return {
          index: index + 1,
          ...estudiante,
          activo: estudiante.activo === 'A' ? 'A' : 'I'
        };
      });
    });
  }
}
