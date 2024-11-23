import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-report-aprobado-reprobado',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './report-aprobado-reprobado.component.html',
  styleUrls: ['./report-aprobado-reprobado.component.scss']
})
export class ReportAprobadoReprobadoComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Programas';

  // Datos dinámicos para los totales
  totalEstudiantes = 40; // Ejemplo de dato dinámico
  totalAprobados = 33; // Ejemplo de dato dinámico
  totalReprobados = 7; // Ejemplo de dato dinámico

  // Cálculo de porcentajes
  get approvedPercentage() {
    return (this.totalAprobados / this.totalEstudiantes) * 100;
  }

  get failedPercentage() {
    return (this.totalReprobados / this.totalEstudiantes) * 100;
  }

  ngOnInit() {
    this.renderChart();
  }

  renderChart() {
    Chart.register(...registerables, ChartDataLabels); // Registra todos los componentes necesarios, incluido el plugin

    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Estudiantes'],
        datasets: [
          {
            label: 'Aprobados',
            data: [this.approvedPercentage],
            backgroundColor: '#DCC07C', // Nuevo color para aprobados
            barThickness: 35, // Aumentar un poco más la altura de la barra
            categoryPercentage: 1.0 // Mantener el ancho completo de la categoría
          },
          {
            label: 'Reprobados',
            data: [this.failedPercentage],
            backgroundColor: '#A36750', // Nuevo color para reprobados
            barThickness: 35, // Aumentar un poco más la altura de la barra
            categoryPercentage: 1.0 // Mantener el ancho completo de la categoría
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            stacked: true, // Hacer que las barras sean apiladas
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          y: {
            stacked: true, // Asegurarse de que las barras se apilen verticalmente
            display: false // Ocultar el eje Y
          }
        },
        plugins: {
          legend: {
            display: true, // Mostrar la leyenda
            position: 'top', // Posición de la leyenda en la parte superior
            labels: {
              usePointStyle: true, // Usar estilo de punto para la leyenda
              boxWidth: 15, // Ancho del cuadro de color en la leyenda
              padding: 20 // Espaciado adicional alrededor de las etiquetas de la leyenda
            }
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
            formatter: (value: number) => `${value.toFixed(2)}%`
          }
        }
      }
    });
  }
}