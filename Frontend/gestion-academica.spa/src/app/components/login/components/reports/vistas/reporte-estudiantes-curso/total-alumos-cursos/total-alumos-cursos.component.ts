import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../../../tools/pie-chart/pie-chart.component';
import { ReporteAlumnoPorCyPService } from '../../../../../../../services/reports/reporte-alumno-por-cy-p.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-alumnos-cursos',
  standalone: true,
  imports: [MatCardModule, PieChartComponent, CommonModule],
  templateUrl: './total-alumos-cursos.component.html',
  styleUrls: ['./total-alumos-cursos.component.scss']
})
export class TotalAlumnosCursosComponent {
  @ViewChild(PieChartComponent) pieChartComponent!: PieChartComponent;

  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Estudiantes por Curso';

  // Datos para la gráfica de pastel
  chartData: any[] = []
  chartLabels: any[] = []
  chartId = 'pieChartCursos';
  data: any[] = []

  constructor(private reporteAlumnoInfo: ReporteAlumnoPorCyPService) {
    this.dataChart()
  }

  updateChart(): void {
    if (this.pieChartComponent) {
      this.pieChartComponent.renderChart();
    }
  }

  dataChart(){
    this.reporteAlumnoInfo.getInfo().subscribe(
      (data: any) => {
        data.cursos.forEach((curso: any) => {
          this.chartData.push(curso.cantidad_alumno);
          this.chartLabels.push(curso.nombre);
        });
        this.data = data.cursos;
        this.updateChart(); // Llama a la función para actualizar la gráfica
      });
  }
}
