import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DateRangePickerComponent } from '../../date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-report-aprobado-reprobado',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, DateRangePickerComponent],
  templateUrl: './report-aprobado-reprobado.component.html',
  styleUrls: ['./report-aprobado-reprobado.component.scss']
})
export class ReportAprobadoReprobadoComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de aprobados y reprobados'; // Título del reporte

  // Datos dinámicos para los totales
  totalEstudiantes = 0;
  totalAprobados = 0;
  totalReprobados = 0;
  chart: Chart | null = null; // Referencia al gráfico

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(startDate?: Date, endDate?: Date) {
    let url = 'http://localhost:3000/reportes/aprobado-reprobado';
    if (startDate && endDate) {
      url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    this.http.get(url).subscribe((data: any) => {
      this.totalEstudiantes = data.totalEstudiantes;
      this.totalAprobados = data.totalAprobados;
      this.totalReprobados = data.totalReprobados;
      this.renderChart();
    });
  }

  onDateRangeSelected(event: { startDate: Date | null, endDate: Date | null }) {
    if (event.startDate && event.endDate) {
      this.loadData(event.startDate, event.endDate);
    }
  }

  // Cálculo de porcentajes
  get approvedPercentage() {
    return (this.totalAprobados / this.totalEstudiantes) * 100;
  }

  get failedPercentage() {
    return (this.totalReprobados / this.totalEstudiantes) * 100;
  }

  renderChart() {
    Chart.register(...registerables, ChartDataLabels); // Registra todos los componentes necesarios, incluido el plugin

    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

    // Destruir el gráfico existente si existe
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Aprobados', 'Reprobados'],
        datasets: [
          {
            label: 'Estudiantes',
            data: [this.approvedPercentage, this.failedPercentage],
            backgroundColor: ['#DCC07C', '#A36750'], // Colores para aprobados y reprobados
            barThickness: 150, // Aumentar el grosor de la barra
            categoryPercentage: 0.3 // Ajustar el ancho de la categoría
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            title: {
              display: true,
              text: 'Porcentaje',
              color: '#361F18' // Color del título del eje Y
            }
          },
          x: {
            title: {
              display: true,
              text: 'Estudiantes',
              color: '#361F18' // Color del título del eje X
            }
          }
        },
        plugins: {
          legend: {
            display: false // Ocultar la leyenda
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                const value = context.raw as number;
                return `${label}: ${value.toFixed(2)}%`;
              }
            }
          },
          datalabels: {
            color: '#361F18',
            font: {
              size: 16
            },
            formatter: (value: number) => {
              return value === 0 ? '' : `${value.toFixed(2)}%`;
            }
          }
        }
      }
    });
  }
}
