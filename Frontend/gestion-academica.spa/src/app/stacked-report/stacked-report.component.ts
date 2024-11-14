import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-stacked-report',
  standalone: true,
  imports: [MatCardModule,PieChartComponent],
  templateUrl: './stacked-report.component.html',
  styleUrl: './stacked-report.component.scss'
})
export class StackedReportComponent {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Estudiantes por programa';
  totalAlumnos = 100; // Ejemplo de datos dinámicos
  totalPorPrograma = 50; // Ejemplo de datos dinámicos
  totalCurso1 = 25; // Ejemplo de datos dinámicos
  totalCurso2 = 30; // Ejemplo de datos dinámicos
  totalCurso3 = 20; // Ejemplo de datos dinámicos
  totalCurso4 = 25; // Ejemplo de datos dinámicos
}

