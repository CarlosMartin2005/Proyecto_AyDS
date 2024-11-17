import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-total-alumnos-programas',
  standalone: true,
  imports: [MatCardModule, PieChartComponent],
  templateUrl: './total-alumos-programas.component.html',
  styleUrls: ['./total-alumos-programas.component.scss']
})
export class TotalAlumnosProgramasComponent {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de estudiantes por programa';
  totalAlumnos = 100; // Ejemplo de datos dinámicos
  programa1 = 35; // Ejemplo de datos dinámicos
  programa2 = 40; // Ejemplo de datos dinámicos
  programa3 = 25; // Ejemplo de datos dinámicos

  // Datos para la gráfica de pastel
  chartData = [this.programa1, this.programa2, this.programa3];
  chartLabels = ['Programa 1', 'Programa 2', 'Programa 3'];
}
