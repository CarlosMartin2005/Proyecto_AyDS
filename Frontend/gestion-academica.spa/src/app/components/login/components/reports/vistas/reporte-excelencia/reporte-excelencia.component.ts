import { Component, OnInit } from '@angular/core';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-reporte-excelencia',
  standalone: true,
  imports: [ButtonGoBackComponent, CommonModule, MatCardModule, HttpClientModule, DateRangePickerComponent],
  templateUrl: './reporte-excelencia.component.html',
  styleUrls: ['./reporte-excelencia.component.scss']
})
export class ReporteExcelenciaComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Excelencia Académica'; // Título del reporte

  // Ajuste de colores según la paleta proporcionada
  colores = ['#A36750', '#DCC07C', '#A59287', '#361F18', '#A56B4E', '#D4AE8D']; // Colores para los estudiantes

  estudiantes: any[] = [];
  chart: Chart | null = null; // Referencia al gráfico

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEstudiantes();
  }

  loadEstudiantes(startDate?: Date, endDate?: Date) {
    let url = 'http://localhost:3000/reportes/excelencia';
    if (startDate && endDate) {
      url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    this.http.get(url).subscribe((data: any) => {
      this.estudiantes = data.sort((a: any, b: any) => b.promedio - a.promedio).map((estudiante: any, index: number) => ({
        ...estudiante,
        color: this.colores[index % this.colores.length]
      }));
      this.generateChart();
    });
  }

  onDateRangeSelected(event: { startDate: Date | null, endDate: Date | null }) {
    if (event.startDate && event.endDate) {
      this.loadEstudiantes(event.startDate, event.endDate);
    }
  }

  // Función para generar el gráfico de barras
  generateChart() {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

    // Destruir el gráfico existente si existe
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.estudiantes.map(e => e.nombre),
        datasets: [
          {
            label: 'Promedio',
            data: this.estudiantes.map(e => e.promedio),
            backgroundColor: this.estudiantes.map(e => e.color),
            borderColor: this.estudiantes.map(e => e.color),
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Estudiantes de excelencia académica",
            color: '#361F18', // Color del título
            padding: {
              bottom: 30
            }
          },
          legend: {
            display: false, // Ocultar la leyenda
          },
          datalabels: {
            color: '#361F18', // Color de las etiquetas de datos
            anchor: 'end',
            align: 'end',
            font: {
              weight: 'bold'
            },
            padding: {
              top: 20 // Añadir más padding superior para evitar que se corte
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Promedio',
              color: '#361F18' // Color del título del eje Y
            },
            ticks: {
              color: '#361F18' // Color de los números del eje Y
            }
          },
          x: {
            title: {
              display: true,
              text: 'Estudiantes',
              color: '#361F18' // Color del título del eje X
            },
            ticks: {
              color: '#361F18' // Color de los nombres de los estudiantes
            }
          }
        }
      }
    });
  }
}