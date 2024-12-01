import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-reporte-seguimiento',
  standalone: true,
  imports: [HttpClientModule, TableComponent, ButtonGoBackComponent, DateRangePickerComponent],
  templateUrl: './reporte-seguimiento.component.html',
  styleUrls: ['./reporte-seguimiento.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteSeguimientoComponent implements OnInit {
  FollowReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'email', label: 'Correo' },
    { key: 'programa', label: 'Programa' },
    { key: 'curso', label: 'Curso' },
    { key: 'nota', label: 'Nota' },
    { key: 'fecha_fin', label: 'Fecha de Fin del Curso' }
  ];

  seguimiento: any[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSeguimiento();
  }

  loadSeguimiento() {
    this.http.get('http://localhost:3000/reportes/seguimiento').subscribe((data: any) => {
      this.seguimiento = data.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item,
          fecha_fin: item.fecha_fin ? new Date(item.fecha_fin).toLocaleDateString('es-ES') : 'N/A' // Formatear la fecha en español
        };
      });
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
      this.http.get(`http://localhost:3000/reportes/seguimiento?startDate=${start}&endDate=${end}`).subscribe((data: any) => {
        this.seguimiento = data.map((item: any, index: number) => {
          return {
            index: index + 1,
            ...item,
            fecha_fin: item.fecha_fin ? new Date(item.fecha_fin).toLocaleDateString('es-ES') : 'N/A' // Formatear la fecha en español
          };
        });
      });
    }
  }
}
