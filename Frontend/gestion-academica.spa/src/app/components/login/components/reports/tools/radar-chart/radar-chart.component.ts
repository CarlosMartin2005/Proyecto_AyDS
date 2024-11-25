import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables, ChartItem } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  standalone: true, // Asegúrate de que el componente sea standalone
  template: '<canvas id="radarChart"></canvas>',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];

  private chart: Chart | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const canvas = document.getElementById('radarChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    this.chart = new Chart(ctx as ChartItem, {
      type: 'radar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Rendimiento del estudiante',
          data: this.data,
          backgroundColor: 'rgba(211, 129, 94, 0.2)', // Color con opacidad
          borderColor: '#A36750',
          borderWidth: 3,
          pointBackgroundColor: '#DCC07C',
          pointBorderColor: '#361F18',
          pointHoverBackgroundColor: '#A56B4E',
          pointHoverBorderColor: '#D4AE8D'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            suggestedMax: 6,
            grid: {
              color: '#A59287'
            },
            angleLines: {
              color: '#A36750'
            },
            pointLabels: {
              color: '#361F18',
              font: {
                size: 14
              }
            },
            ticks: {
              stepSize: 1,
              callback: (value) => {
                const labels = ['Insuficiente', 'Necesita Mejorar', 'Aceptable', 'Bueno', 'Muy Bueno', 'Sobresaliente'];
                return labels[value as number];
              },
              color: '#361F18', // Color de los valores
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    }
  }
}
