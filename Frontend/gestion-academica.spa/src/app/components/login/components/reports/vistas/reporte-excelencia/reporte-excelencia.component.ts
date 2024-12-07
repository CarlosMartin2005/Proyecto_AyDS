import { Component, OnInit } from '@angular/core';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-reporte-excelencia',
  standalone: true,
  imports: [ButtonGoBackComponent, CommonModule, MatCardModule, HttpClientModule],
  templateUrl: './reporte-excelencia.component.html',
  styleUrls: ['./reporte-excelencia.component.scss']
})
export class ReporteExcelenciaComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Excelencia Académica'; // Título del reporte

  colores = ['#fab174', '#f7b5a1', '#f3c1c9', '#f0c7f0', '#c7c7f0']; // Colores para los estudiantes

  estudiantes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEstudiantes();
  }

  loadEstudiantes() {
    this.http.get('http://localhost:3000/reportes/excelencia').subscribe((data: any) => {
      this.estudiantes = data.sort((a: any, b: any) => b.promedio - a.promedio).map((estudiante: any, index: number) => ({
        ...estudiante,
        color: this.colores[index % this.colores.length]
      }));
      this.generateChart();
    });
  }

  // Función para generar el gráfico de barras
  generateChart() {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

    new Chart(ctx, {
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
            color: '#000',
            padding: {
              bottom: 30
            }
          },
          legend: {
            display: false, // Ocultar la leyenda

          },
          datalabels: {
            color: '#000', // Cambiar el color de las etiquetas de datos a negro
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
              text: 'Promedio'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Estudiantes'
            }
          }
        }
      }
    });
  }
}