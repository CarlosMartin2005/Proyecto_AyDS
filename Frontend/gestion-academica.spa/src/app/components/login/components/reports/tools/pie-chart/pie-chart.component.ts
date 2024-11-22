import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ArcElement, PieController, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    console.log('Rendering Chart with data:', this.data, 'and labels:', this.labels);

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ['#A36750', '#DCC07C', '#A59287', '#361F18', '#A56B4E', '#D4AE8D'],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              const sum = (context.dataset.data as number[]).reduce((a, b) => Number(a) + Number(b), 0);
              const percentage = ((Number(value) / (sum || 1)) * 100).toFixed(2) + '%';
              return percentage;
            },
            color: '#ffffff', // Color de las etiquetas
            font: {
              weight: 'bold',
              size: 14
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                const value = Number(context.raw); // Especificar tipo
                const sum = (context.dataset.data as number[]).reduce((a, b) => Number(a) + Number(b), 0);
                const percentage = ((value / (sum || 1)) * 100).toFixed(2) + '%'; // Asegura que sum no sea null
                label += percentage;
                return label;
              }
            }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                family: 'Arial', // Ajustar según tu preferencia
                size: 14, // Ajustar según tu preferencia
              },
              color: '#361F18' // Cuaternario, ajustado a la paleta
            }
          },
        }
      },
      plugins: [ChartDataLabels]
    });
  }
}
