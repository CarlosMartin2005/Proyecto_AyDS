import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BarChartComponent } from '../../../tools/bar-chart-component/bar-chart-component.component';
import { ReporteAlumnoPorCyPService } from '../../../../../../../services/reports/reporte-alumno-por-cy-p.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-alumnos-cursos',
  standalone: true,
  imports: [MatCardModule, BarChartComponent, CommonModule],
  templateUrl: './total-alumos-cursos.component.html',
  styleUrls: ['./total-alumos-cursos.component.scss']
})
export class TotalAlumnosCursosComponent {
  @ViewChild(BarChartComponent) barChartComponent!: BarChartComponent;

  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Estudiantes por Curso';

  chartData: number[] = [];
  chartLabels: string[] = [];
  chartId = 'barChartCursos';
  data: any[] = [];

  constructor(private reporteAlumnoInfo: ReporteAlumnoPorCyPService) {
    this.dataChart();
  }

  updateChart(): void {
    if (this.barChartComponent) {
      this.barChartComponent.renderChart();
    }
  }

  dataChart(): void {
    this.reporteAlumnoInfo.getInfo().subscribe(
      (data: any) => {
        this.chartData = data.cursos.map((curso: any) => curso.cantidad_alumno);
        this.chartLabels = data.cursos.map((curso: any) => curso.nombre);
        this.data = data.cursos;
        this.updateChart();
      });
  }
}
