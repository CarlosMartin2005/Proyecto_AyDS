import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-reporte-programas-cursos',
  standalone: true,
  imports: [HttpClientModule, ButtonGoBackComponent, TableComponent],
  templateUrl: './reporte-programas-cursos.component.html',
  styleUrl: './reporte-programas-cursos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteProgramasCursosComponent implements OnInit {
  ProgramReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'programa', label: 'Programa' },
    { key: 'curso', label: 'Curso' },
    { key: 'docente', label: 'Docente' },
    { key: 'horario', label: 'Horario' }
  ];

  programasCursos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/reportes/programas-cursos').subscribe((data: any) => {
      this.programasCursos = data.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item
        };
      });
    });
  }
}