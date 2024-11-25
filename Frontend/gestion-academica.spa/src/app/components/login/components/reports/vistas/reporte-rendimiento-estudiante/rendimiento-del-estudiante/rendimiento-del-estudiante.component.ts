import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RadarChartComponent } from '../../../tools/radar-chart/radar-chart.component';
import { ReporteRendimientoService } from '../../../../../../../services/reports/reporte-rendimiento/reporte-rendimiento.service';
import { FormateadorService } from '../../../../../../../services/otros/formateador/formateador.service';

@Component({
  selector: 'app-rendimiento-del-estudiante',
  standalone: true,
  imports: [MatCardModule, RadarChartComponent],
  templateUrl: './rendimiento-del-estudiante.component.html',
  styleUrls: ['./rendimiento-del-estudiante.component.scss']
})
export class RendimientoDelEstudianteComponent {

  @ViewChild(RadarChartComponent) radarChartComponent!: RadarChartComponent;

  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Rendimiento del Estudiante';

  constructor(private reporteRendimientoService: ReporteRendimientoService, private formateador: FormateadorService) {
    this.dataChart();
  }

  // Información del estudiante
  studentInfo = {
    nombreCompleto: 'Juan Pérez',
    // numeroCuenta: '20220001',
    edad: 21,
    email: '',
    identidad: '0801-1999-12345'
  };

  // Características del estudiante
  studentCharacteristics = {
    rendimientoAcademico: 5, // Sobresaliente
    manejoInstrumentos: 4, // Muy Bueno
    interpretacion: 3, // Bueno
    creatividad: 2, // Aceptable
    trabajoEquipo: 1, // Necesita Mejorar
  };

  // Datos para la gráfica de araña
  chartData = Object.values(this.studentCharacteristics);
  chartLabels = ['Rendimiento Académico', 'Manejo de instrumentos', 'Interpretación', 'Creatividad', 'Trabajo en equipo'];

  // Función para obtener etiquetas de características
  getLabel(value: number): string {
    // redondear el valor
    value = Math.round(value);
    const labels = ['Insuficiente', 'Necesita Mejorar', 'Aceptable', 'Bueno', 'Muy Bueno', 'Sobresaliente'];
    return labels[value];
  }

  dataChart() {
    this.reporteRendimientoService.getInfo(3).subscribe(
      (data: any) => {
        // this.studentInfo = data.estudiante;
        // this.studentCharacteristics = data.caracteristicas;
        // this.chartData = Object.values(this.studentCharacteristics);
        console.log(data);
        this.studentCharacteristics = {
          rendimientoAcademico: data.promedio_rendimiento_academico,
          manejoInstrumentos: data.promedio_manejo_instrumentos,
          interpretacion: data.promedio_interpretacion,
          creatividad: data.promedio_creatividad,
          trabajoEquipo: data.promedio_trabajo_equipo,
        }
        const edadEnd = this.formateador.calcularEdad(data.fecha_nacimiento);

        const nombreEnd = data.nombre + ' ' + data.apellido;

        this.studentInfo = {
          nombreCompleto: nombreEnd,
          edad: edadEnd,
          email: data.email,
          identidad: data.identidad
        }


        this.updateChart(); // Llama a la función para actualizar la gráfica
      });
  }

  updateChart(): void {
    if (this.radarChartComponent) {
      this.radarChartComponent.data = Object.values(this.studentCharacteristics);
      this.radarChartComponent.labels = this.chartLabels;
      this.radarChartComponent.updateChart();
    }
  }
}
