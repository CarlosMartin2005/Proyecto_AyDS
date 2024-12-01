import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';
import { FormateadorService } from '../../../../../../services/otros/formateador/formateador.service';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-reporte-estudiantes',
  standalone: true,
  imports: [DateRangePickerComponent, HttpClientModule, ButtonGoBackComponent, TableComponent],
  templateUrl: './reporte-estudiantes.component.html',
  styleUrls: ['./reporte-estudiantes.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteEstudiantesComponent implements OnInit {
  userReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'identidad', label: 'Identidad' },
    { key: 'fecha_de_nacimiento', label: 'Fecha de nacimiento' },
    { key: 'email', label: 'Correo' },
    // { key: 'programa', label: 'Programas' },
    { key: 'curso', label: 'Cursos' },
    // { key: 'horario', label: 'Horario' },
    // { key: 'activo', label: 'Estado' },
  ];

  estudiantes: any[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private http: HttpClient, private formateador: FormateadorService) {}

  ngOnInit() {
    this.loadEstudiantes();
  }

  loadEstudiantes() {
    this.http.get('http://localhost:3000/reportes/estudiantes').subscribe({
      next: (data: any) => {
        this.estudiantes = data.map((estudiante: any, index: number) => {
          const fecha = this.formateador.convertirFechaMySQLaStandarWeb(estudiante.fecha_de_nacimiento)
          const fechaFormateada = fecha[3] + '/' + fecha[2] + '/' + fecha[1];
          return {
            index: index + 1,
            ...estudiante,
            activo: estudiante.activo === 'A' ? 'Activo' : 'Inactivo',
            fecha_de_nacimiento: fechaFormateada
          };
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos de estudiantes:', error);
      }
    });
  }

  onDateRangeSelected(dateRange: { startDate: Date | null, endDate: Date | null }) {
    this.startDate = dateRange.startDate;
    this.endDate = dateRange.endDate;
    this.filterByDate();
  }

  filterByDate() {
    if (this.startDate && this.endDate) {
      const start = this.startDate.toISOString().split('T')[0];
      const end = this.endDate.toISOString().split('T')[0];
      this.http.get(`http://localhost:3000/reportes/estudiantes?startDate=${start}&endDate=${end}`).subscribe({
        next: (data: any) => {
          this.estudiantes = data.map((estudiante: any, index: number) => {
            const fecha = this.formateador.convertirFechaMySQLaStandarWeb(estudiante.fecha_de_nacimiento)
            const fechaFormateada = fecha[3] + '/' + fecha[2] + '/' + fecha[1];
            return {
              index: index + 1,
              ...estudiante,
              activo: estudiante.activo === 'A' ? 'Activo' : 'Inactivo',
              fecha_de_nacimiento: fechaFormateada
            };
          });
        },
        error: (error) => {
          console.error('Error al cargar los datos de estudiantes:', error);
        }
      });
    }
  }
}