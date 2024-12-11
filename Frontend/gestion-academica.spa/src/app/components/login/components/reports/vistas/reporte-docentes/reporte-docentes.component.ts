import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-reporte-docentes',
  standalone: true,
  imports: [HttpClientModule, ButtonGoBackComponent, TableComponent, DateRangePickerComponent],
  templateUrl: './reporte-docentes.component.html',
  styleUrls: ['./reporte-docentes.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteDocentesComponent implements OnInit {
  userReportColumns = [
    { key: 'index', label: 'No.' },
    { key: 'nombreCompleto', label: 'Nombre' },
    // { key: 'apellidos', label: 'Apellidos' },
    { key: 'email', label: 'Correo' },
    { key: 'especialidad', label: 'Curso Impartido' },
    { key: 'numeroCuenta', label: 'Numero de Cuenta' },
  ];

  docentes: any[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDocentes();
  }

  loadDocentes() {
    this.http.get('http://localhost:3000/reportes/docentes').subscribe((data: any) => {
      this.docentes = data.map((docente: any, index: number) => {
        return {
          nombreCompleto: `${docente.nombres} ${docente.apellidos}`,
          index: index + 1,
          ...docente,
          activo: docente.status === 'A' ? 'Activo' : 'Inactivo'
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
      this.http.get(`http://localhost:3000/reportes/docentes?startDate=${start}&endDate=${end}`).subscribe((data: any) => {
        this.docentes = data.map((docente: any, index: number) => {
          return {
            index: index + 1,
            ...docente,
            activo: docente.status === 'A' ? 'Activo' : 'Inactivo'
          };
        });
      });
    }
  }

  logoUrl = '../../../../../../assets/logo.png';
}
