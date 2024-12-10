import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas id="{{ chartId }}"></canvas>',
  styleUrls: ['./bar-chart-component.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() chartId!: string;

  chart: Chart | null = null;

  ngOnInit(): void {
    this.renderChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy();
      this.renderChart();
    }
  }

  renderChart(): void {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById(this.chartId) as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    const palette = ['#A36750', '#DCC07C', '#A59287', '#361F18', '#A56B4E', '#D4AE8D'];
    const backgroundColors = this.labels.map((_, index) => palette[index % palette.length]);
    const borderColors = backgroundColors;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Cantidad de Alumnos',
          data: this.data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Total de Alumnos por Curso",
            color: '#361F18',
            padding: {
              bottom: 30
            }
          },
          legend: {
            display: false,
          },
          datalabels: {
            color: '#361F18',
            anchor: 'end',
            align: 'end',
            font: {
              weight: 'bold'
            },
            padding: {
              top: 20
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Alumnos',
              color: '#361F18'
            },
            ticks: {
              color: '#361F18'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Cursos',
              color: '#361F18'
            },
            ticks: {
              color: '#361F18'
            }
          }
        }
      }
    });
  }
}
