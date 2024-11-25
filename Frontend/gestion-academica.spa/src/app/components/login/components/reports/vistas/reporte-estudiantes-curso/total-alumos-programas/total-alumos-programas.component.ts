import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../../../tools/pie-chart/pie-chart.component';
import { ReporteAlumnoPorCyPService } from '../../../../../../../services/reports/reporte-alumno-por-cy-p.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-alumnos-programas',
  standalone: true,
  imports: [MatCardModule, PieChartComponent, CommonModule],
  templateUrl: './total-alumos-programas.component.html',
  styleUrls: ['./total-alumos-programas.component.scss']
})
export class TotalAlumnosProgramasComponent {
  @ViewChild(PieChartComponent) pieChartComponent!: PieChartComponent;

  constructor(private reporteAlumnoInfo: ReporteAlumnoPorCyPService) {
    this.dataChart()
   }

  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de estudiantes por programa';
  totalAlumnos = 100; // Ejemplo de datos dinámicos

  // Datos para la gráfica de pastel
  chartData: any = [];
  chartLabels: any = [];
  chartId = 'pieChartProgramas';
  data: any[] = [];

  updateChart(): void {
    if (this.pieChartComponent) {
      this.pieChartComponent.renderChart();
    }
  }

  dataChart(){
    this.reporteAlumnoInfo.getInfo().subscribe(
      (data: any) => {
        data.programas.forEach((programa: any) => {
          this.chartData.push(programa.cantidad_alumno);
          this.chartLabels.push(programa.nombre);
        });
        this.totalAlumnos = data.alumnos_total;
        this.data = data.programas;
        this.updateChart(); // Llama a la función para actualizar la gráfica
      });
  }
}
