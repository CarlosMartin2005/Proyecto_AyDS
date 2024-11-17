import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-report-matricula',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Añádelo aquí
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './report-matricula.component.html',
  styleUrls: ['./report-matricula.component.scss']
})
export class ReportMatriculaComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Matrícula';

  // Información del usuario
  nombreCompleto = 'Juan Pérez';
  numeroIdentidad = '123456789';

  // Programas disponibles
  programas = ['Programa 1', 'Programa 2'];
  selectedPrograma = this.programas[0];

  // Datos para la tabla
  cursos = [
    { programa: 'Programa 1', curso: 'Curso A', seccion: 'Sección 1', hora: '8:00 AM', dia: 'Lunes' },
    { programa: 'Programa 1', curso: 'Curso B', seccion: 'Sección 2', hora: '10:00 AM', dia: 'Martes' },
    { programa: 'Programa 2', curso: 'Curso C', seccion: 'Sección 1', hora: '2:00 PM', dia: 'Miércoles' },
    { programa: 'Programa 2', curso: 'Curso D', seccion: 'Sección 3', hora: '4:00 PM', dia: 'Jueves' }
  ];
  cursosFiltrados = this.cursos.filter(curso => curso.programa === this.selectedPrograma);

  ngOnInit() {
    this.filterCursos();
  }

  onProgramaChange() {
    this.filterCursos();
  }

  onProgramaClick(programa: string) {
    this.selectedPrograma = programa;
    this.filterCursos();
  }

  filterCursos() {
    this.cursosFiltrados = this.cursos.filter(curso => curso.programa === this.selectedPrograma);
  }
}
