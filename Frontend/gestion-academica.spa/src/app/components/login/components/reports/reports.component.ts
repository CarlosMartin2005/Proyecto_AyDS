import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReporteDocentesComponent } from './vistas/reporte-docentes/reporte-docentes.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink, ReporteDocentesComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsComponent {
  constructor() {}
  reportes = [
    {
      image: 'assets/icons-reports/docente.png',
      title: 'Reporte de Docentes',
      ruta: 'docentes',
    },
    {
      image: 'assets/icons-reports/estudiantes.png',
      title: 'Reporte de Estudiantes',
      ruta: 'estudiantes'
    },
    {
      image: 'assets/icons-reports/programas-cursos.png',
      title: 'Reporte de Programas y Cursos',
      ruta: 'programas-cursos'
    },
    {
      image: 'assets/icons-reports/seguimiento.png',
      title: 'Reporte de Seguimiento Académico',
      ruta: 'seguimiento'
    },
    {
      image: 'assets/icons-reports/estudiantes-cursos.png',
      title: 'Reporte de Estudiantes por Programas y Curso',
      ruta: 'estudiantes-curso'
    },
    {
      image: 'assets/icons-reports/matricula.png',
      title: 'Reporte de Matrícula',
      ruta: 'matricula'
    },
    {
      image: 'assets/icons-reports/rendimiento.png',
      title: 'Reporte de Rendimiento del Estudiante',
      ruta: 'rendimiento'
    },
    {
      image: 'assets/icons-reports/programas.png',
      title: 'Reporte de aprobados y reprobados',
      ruta: 'programas'
    },
  ]

}
