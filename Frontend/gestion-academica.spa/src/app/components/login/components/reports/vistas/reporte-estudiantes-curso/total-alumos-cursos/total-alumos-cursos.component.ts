import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../../../tools/pie-chart/pie-chart.component';

@Component({
  selector: 'app-total-alumnos-cursos',
  standalone: true,
  imports: [MatCardModule, PieChartComponent],
  templateUrl: './total-alumos-cursos.component.html',
  styleUrls: ['./total-alumos-cursos.component.scss']
})
export class TotalAlumnosCursosComponent {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Estudiantes por Curso';
  totalAlumnos = 100; // Ejemplo de datos dinámicos
  totalCurso1 = 25; // Ejemplo de datos dinámicos
  totalCurso2 = 30; // Ejemplo de datos dinámicos
  totalCurso3 = 20; // Ejemplo de datos dinámicos
  totalCurso4 = 25; // Ejemplo de datos dinámicos

  // Datos para la gráfica de pastel
  chartData = [this.totalCurso1, this.totalCurso2, this.totalCurso3, this.totalCurso4];
  chartLabels = ['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4'];
}
