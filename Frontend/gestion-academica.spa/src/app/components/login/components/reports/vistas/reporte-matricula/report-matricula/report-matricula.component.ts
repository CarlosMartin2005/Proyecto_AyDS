import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonGoBackComponent } from '../../button-go-back/button-go-back.component';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-report-matricula',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Añádelo aquí
    HttpClientModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    ButtonGoBackComponent,
    TableComponent
  ],
  templateUrl: './report-matricula.component.html',
  styleUrls: ['./report-matricula.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportMatriculaComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Matrícula';

  // Información del usuario
  alumnos: any[] = [];
  filteresAlumnos: any[] = [];
  selectedAlumno: any = null;
  searchQuery: string = '';

  // Programas disponibles
  programas: string[] = [];
  selectedPrograma: string = '';

  // Datos para la tabla de cursos
  cursos: any[] = [];
  cursosFiltrados: any[] = [];

  // Datos para el reporte de matrícula
  MatriculaReportColumns = [
    { key: 'id_alumno', label: 'ID del Alumno' },
    { key: 'nombre_completo', label: 'Nombre Completo' },
    { key: 'numero_identidad', label: 'No. de Identidad' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'programas', label: 'Programas' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAlumnos();
    this.loadProgramas();
  }

  loadAlumnos() {
    this.http.get('http://localhost:3000/reportes/matricula').subscribe((data: any) => {
      this.alumnos = data;
      if (this.alumnos.length > 0) {
        this.selectedAlumno = this.alumnos[0];
        this.loadCursos();
      }
    });
  }

  loadProgramas() {
    this.http.get('http://localhost:3000/reportes/programas').subscribe((data: any) => {
      this.programas = data.map((programa: any) => programa.nombre);
      this.selectedPrograma = this.programas[0];
      this.loadCursos();
    });
  }

  loadCursos() {
    this.http.get('http://localhost:3000/reportes/cursos').subscribe((data: any) => {
      this.cursos = data;
      this.filterCursos();
    });
  }

  onProgramaChange() {
    this.filterCursos();
  }

  onProgramaClick(programa: string) {
    this.selectedPrograma = programa;
    this.filterCursos();
  }

  filterCursos() {
    if (this.selectedAlumno) {
      this.cursosFiltrados = this.cursos.filter(curso => curso.programa === this.selectedPrograma);
    }
  }
}