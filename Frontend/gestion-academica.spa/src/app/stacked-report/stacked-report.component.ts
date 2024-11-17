import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-stacked-report',
  standalone: true,
  imports: [MatCardModule, PieChartComponent],
  templateUrl: './stacked-report.component.html',
  styleUrls: ['./stacked-report.component.scss']
})
export class StackedReportComponent {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Programas';

  // Datos para la gráfica de pastel
  chartData = [35, 40, 25]; // Ejemplo de datos dinámicos
  chartLabels = ['Programa 1', 'Programa 2', 'Programa 3'];
}

