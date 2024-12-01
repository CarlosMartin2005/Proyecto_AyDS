import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { TableComponent } from '../table/table.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-reporte-programas-cursos',
  standalone: true,
  imports: [HttpClientModule, ButtonGoBackComponent, TableComponent, DateRangePickerComponent],
  templateUrl: './reporte-programas-cursos.component.html',
  styleUrl: './reporte-programas-cursos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteProgramasCursosComponent implements OnInit {
  ProgramReportColumns = [
    { key: 'index', label: 'Indice' },
    { key: 'programa', label: 'Programa' },
    { key: 'curso', label: 'Curso' },
    { key: 'docente', label: 'Docente' },
    { key: 'horario', label: 'Horario' }
  ];

  programasCursos: any[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProgramasCursos();
  }

  loadProgramasCursos() {
    this.http.get('http://localhost:3000/reportes/programas-cursos').subscribe((data: any) => {
      this.programasCursos = data.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item
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
      this.http.get(`http://localhost:3000/reportes/programas-cursos?startDate=${start}&endDate=${end}`).subscribe((data: any) => {
        this.programasCursos = data.map((item: any, index: number) => {
          return {
            index: index + 1,
            ...item
          };
        });
      });
    }
  }
}