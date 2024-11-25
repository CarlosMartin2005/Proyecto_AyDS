import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RadarChartComponent } from '../../../tools/radar-chart/radar-chart.component';

@Component({
  selector: 'app-rendimiento-del-estudiante',
  standalone: true,
  imports: [MatCardModule, RadarChartComponent],
  templateUrl: './rendimiento-del-estudiante.component.html',
  styleUrls: ['./rendimiento-del-estudiante.component.scss']
})
export class RendimientoDelEstudianteComponent {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Rendimiento del Estudiante';

  // Información del estudiante
  studentInfo = {
    nombreCompleto: 'Juan Pérez',
    // numeroCuenta: '20220001',
    edad: 21,
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
    const labels = ['Insuficiente', 'Necesita Mejorar', 'Aceptable', 'Bueno', 'Muy Bueno', 'Sobresaliente'];
    return labels[value];
  }
}
