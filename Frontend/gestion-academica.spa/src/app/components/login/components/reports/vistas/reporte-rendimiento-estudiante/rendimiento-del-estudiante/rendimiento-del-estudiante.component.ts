import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RadarChartComponent } from '../../../tools/radar-chart/radar-chart.component';
import { ReporteRendimientoService } from '../../../../../../../services/reports/reporte-rendimiento/reporte-rendimiento.service';
import { FormateadorService } from '../../../../../../../services/otros/formateador/formateador.service';
import { SearchBarComponent } from '../../../../../../../otros/search-bar/search-bar.component';
import { EstudiantesService } from '../../../../../../../services/estudiantes/estudiantes.service';
import { DateRangePickerComponent } from '../../date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-rendimiento-del-estudiante',
  standalone: true,
  imports: [CommonModule, MatCardModule, RadarChartComponent, SearchBarComponent, DateRangePickerComponent],
  templateUrl: './rendimiento-del-estudiante.component.html',
  styleUrls: ['./rendimiento-del-estudiante.component.scss']
})
export class RendimientoDelEstudianteComponent {
  estudiantes: any[] = [];
  filteredEstudiantes: any[] = [];
  columnsNamesEstudiantes = {
    'nombre': 'Nombre',
    'identidad': 'Identidad',
    'email': 'Correo',
    'curso': 'Curso',
    'programa': 'Programa'
  };
  estudianteSeleccionado: any;

  @ViewChild(RadarChartComponent) radarChartComponent!: RadarChartComponent;

  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Reporte de Rendimiento del Estudiante';

  constructor(private reporteRendimientoService: ReporteRendimientoService, private formateador: FormateadorService, private estudiantesService: EstudiantesService) {
    this.estudiantesService.getEstudiantes().subscribe({
      next: (data: any) => {
        this.estudiantes = data.map((estudiante: any, index: number) => {
          const nombreEnd = estudiante.nombres + ' ' + estudiante.apellidos;
          return {
            id: estudiante.id,
            nombre: nombreEnd,
            identidad: estudiante.identidad,
            email: estudiante.email,
            curso: estudiante.curso,
            programa: estudiante.programa,
            fecha_matricula: estudiante.fecha_matricula // Asegúrate de que esta propiedad exista
          };
        });
        this.filteredEstudiantes = this.estudiantes; // Inicialmente mostrar todos los estudiantes
        console.log(this.estudiantes);
      },
      error: (error) => {
        console.error('Error al cargar los datos de estudiantes:', error);
      }
    });
  }

  // Información del estudiante
  studentInfo = {
    nombreCompleto: 'Juan Pérez',
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

  dataChart(id: any, startDate?: Date, endDate?: Date) {
    this.reporteRendimientoService.getInfo(id, startDate, endDate).subscribe(
      (data: any) => {
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

  onRowSelected(row: any) {
    console.log('Fila seleccionada:', row.id);
    this.estudianteSeleccionado = row.id;
    this.dataChart(this.estudianteSeleccionado);
  }

  mostrarCard(): boolean {
    return this.estudianteSeleccionado ? true : false;
  }

  onDateRangeSelected(event: { startDate: Date | null, endDate: Date | null }) {
    const { startDate, endDate } = event;
    if (startDate && endDate) {
      this.filteredEstudiantes = this.estudiantes.filter(estudiante => {
        if (!estudiante.fecha_matricula) {
          return false;
        }
        const fechaMatricula = new Date(estudiante.fecha_matricula);
        return fechaMatricula >= startDate && fechaMatricula <= endDate;
      });
    } else {
      this.filteredEstudiantes = this.estudiantes; // Mostrar todos los estudiantes si no hay rango de fechas seleccionado
    }
  }
}