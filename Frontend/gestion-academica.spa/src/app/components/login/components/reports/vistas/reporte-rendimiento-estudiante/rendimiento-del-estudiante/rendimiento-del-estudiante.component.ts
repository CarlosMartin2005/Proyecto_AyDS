import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RadarChartComponent } from '../../../tools/radar-chart/radar-chart.component';
import { ReporteRendimientoService } from '../../../../../../../services/reports/reporte-rendimiento/reporte-rendimiento.service';
import { FormateadorService } from '../../../../../../../services/otros/formateador/formateador.service';
import { SearchBarComponent } from '../../../../../../../otros/search-bar/search-bar.component';
import { EstudiantesService } from '../../../../../../../services/estudiantes/estudiantes.service';

@Component({
  selector: 'app-rendimiento-del-estudiante',
  standalone: true,
  imports: [MatCardModule, RadarChartComponent, SearchBarComponent],
  templateUrl: './rendimiento-del-estudiante.component.html',
  styleUrls: ['./rendimiento-del-estudiante.component.scss']
})
export class RendimientoDelEstudianteComponent {
  estudiantes: any[] = [];
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
            programa: estudiante.programa
          };
        });
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

  dataChart(id: any) {
    this.reporteRendimientoService.getInfo(id).subscribe(
      (data: any) => {
        // this.studentInfo = data.estudiante;
        // this.studentCharacteristics = data.caracteristicas;
        // this.chartData = Object.values(this.studentCharacteristics);
        // console.log(data);
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

    // Aquí puedes manejar la fila seleccionada como desees
  }

  mostrarCard(): boolean {
    return this.estudianteSeleccionado ? true : false;
  }
}
