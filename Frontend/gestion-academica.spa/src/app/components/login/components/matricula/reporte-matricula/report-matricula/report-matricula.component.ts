import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EstudiantesService } from '../../../../../../services/estudiantes/estudiantes.service';
import { SearchBarComponent } from '../../../../../../otros/search-bar/search-bar.component';
import { DateRangePickerComponent } from '../../../../../../components/login/components/reports/vistas/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-report-matricula',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    SearchBarComponent,
    DateRangePickerComponent
  ],
  templateUrl: './report-matricula.component.html',
  styleUrls: ['./report-matricula.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportMatriculaComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  reportTitle = 'Consulta de Matrícula';

  alumnos: any[] = [];
  columsNamesAlumnos = {
    'nombre_completo': 'Nombre Completo',
    'numero_identidad': 'No. de Identidad',
    'programas': 'Programas'
  };
  filteresAlumnos: any[] = [];
  selectedAlumno: any = null;
  searchQuery: string = '';

  programas: string[] = [];
  selectedPrograma: string = '';

  cursos: any[] = [];
  cursosFiltrados: any[] = [];

  MatriculaReportColumns = [
    { key: 'id_alumno', label: 'ID del Alumno' },
    { key: 'nombre_completo', label: 'Nombre Completo' },
    { key: 'numero_identidad', label: 'No. de Identidad' },
    { key: 'programas', label: 'Programas' }
  ];

  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private http: HttpClient,
    private estudiantesService: EstudiantesService
  ) {}

  ngOnInit() {
    this.loadAlumnos();
  }

  loadAlumnos(searchQuery?: string) {
    this.estudiantesService.getEstudiantes(searchQuery).subscribe({
      next: (data: any) => {
        this.alumnos = data.map((estudiante: any, index: number) => {
          return {
            id: estudiante.id,
            nombre_completo: estudiante.nombres + ' ' + estudiante.apellidos,
            numero_identidad: estudiante.identidad,
            programas: estudiante.programa.split(', ')
          };
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos de estudiantes:', error);
      }
    });
  }

  onSearch(query: string) {
    this.loadAlumnos(query);
  }

  loadProgramas() {
    if (this.selectedAlumno) {
      this.programas = this.selectedAlumno.programas;
      this.selectedPrograma = this.programas[0];
      this.loadCursos();
    }
  }

  loadCursos() {
    this.http.get('http://localhost:3000/reportes/cursos').subscribe((data: any) => {
      this.cursos = data;
      console.log('Cursos cargados:', this.cursos);
      this.filterCursos();
    });
  }

  onProgramaChange() {
    console.log('Programa cambiado:', this.selectedPrograma);
    this.filterCursos();
  }

  onProgramaClick(programa: string) {
    this.selectedPrograma = programa;
    console.log('Programa seleccionado:', this.selectedPrograma);
    this.filterCursos();
  }

  filterCursos() {
    if (this.selectedAlumno) {
      console.log('Selected Alumno:', this.selectedAlumno);
      console.log('Selected Programa:', this.selectedPrograma);
      console.log('Cursos:', this.cursos);

      this.cursosFiltrados = this.cursos.filter(curso =>
        curso.programa === this.selectedPrograma &&
        curso.alumnos && curso.alumnos.split(',').includes(this.selectedAlumno.id)
      );

      console.log('Cursos Filtrados:', this.cursosFiltrados);
    }
  }

  onDateRangeSelected(event: { startDate: Date | null, endDate: Date | null }) {
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.filterByDate();
  }

  filterByDate() {
    if (this.startDate && this.endDate) {
      const start = this.startDate.toISOString().split('T')[0];
      const end = this.endDate.toISOString().split('T')[0];
      this.http.get(`http://localhost:3000/reportes/estudiantes?startDate=${start}&endDate=${end}`).subscribe({
        next: (data: any) => {
          this.alumnos = data.map((estudiante: any, index: number) => {
            return {
              id: estudiante.id,
              nombre_completo: estudiante.nombres + ' ' + estudiante.apellidos,
              numero_identidad: estudiante.identidad,
              programas: estudiante.programa.split(', ')
            };
          });
        },
        error: (error) => {
          console.error('Error al cargar los datos de estudiantes:', error);
        }
      });
    }
  }

  imprimirReporte() {
    console.log('Alumnos en imprimirReporte:', this.alumnos);
    console.log('Cursos Filtrados en imprimirReporte:', this.cursosFiltrados);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const padding = 40; // Considera algo de espacio para padding
    const logoUrl = '../../../../../../assets/logo.png';
    const encabezadoColor = "#D69A77"; // Color del encabezado
    const fontColor = "#000000"; // Negro para contraste

    // Añadir el rectángulo de color al encabezado
    doc.setFillColor(encabezadoColor);
    doc.rect(padding, 20, pageWidth - padding * 2, 80, 'F');

    // Añadir el logo en la parte superior izquierda dentro del rectángulo
    doc.addImage(logoUrl, 'PNG', padding + 10, 30, 60, 60); // Ajusta el tamaño y la posición según sea necesario

    // Título del conservatorio
    doc.setFontSize(20);
    doc.setTextColor(fontColor);
    doc.text("Conservatorio Sampedrano de las Artes", padding + 80, 50, { align: 'left' });

    // Fecha actual
    doc.setFontSize(14);
    const currentDate = new Date().toLocaleDateString();
    doc.text(currentDate, pageWidth - padding - 10, 50, { align: 'right' });

    if (this.selectedAlumno) {
      const MatriculaReportColumnsWithoutDate = this.MatriculaReportColumns.filter(col => col.key !== 'fecha');

      // Generar la tabla apilada sin celdas internas
      const stackedTableBody = MatriculaReportColumnsWithoutDate.map(col => [`${col.label}:`, this.selectedAlumno[col.key]]);

      // Renderizar el encabezado de la tabla con el título
      autoTable(doc, {
        startY: 120,
        head: [[this.reportTitle]],
        body: [],
        theme: 'grid',
        styles: {
          textColor: [54, 31, 24],
          fontSize: 12, // Disminuir el tamaño de fuente del título
          cellPadding: 2,
          overflow: 'linebreak',
          minCellHeight: 20,
        },
        headStyles: {
          fillColor: [163, 103, 80],
          textColor: [255, 255, 255],
          fontSize: 14, // Disminuir el tamaño de fuente del encabezado
          halign: 'center', // Centrar el texto del encabezado
          valign: 'middle', // Alinear verticalmente el texto
        },
        columnStyles: {
          0: { halign: 'left' }
        },
        tableLineColor: [54, 31, 24],
        tableLineWidth: 0.75,
        margin: { left: padding, right: padding }
      });

      // Ajustar el espaciado entre claves y valores y desplazar hacia abajo
      const lineHeight = 14;
      let currentY = 160; // Desplazar unos píxeles más abajo
      stackedTableBody.forEach(row => {
        const [key, value] = row;
        if (key && value) { // Asegurarse de que key y value no sean indefinidos o nulos
          doc.setFontSize(10);
          doc.text(key, padding, currentY);
          doc.text(value, padding + 150, currentY); // Ajustar posición del valor
          currentY += lineHeight;
        }
      });

      const stackedTableHeight = currentY + 10; // Añadir margen inferior

      // Tabla de detalles sin título 'Consulta de Matrícula'
      const detailColumns = ['Curso', 'Docente', 'Horario'];
      const detailRows = this.cursosFiltrados.map(curso => [curso.nombre, curso.docente, curso.horario]);

      autoTable(doc, {
        startY: stackedTableHeight, // Iniciar justo después de la tabla apilada
        head: [detailColumns],
        body: detailRows,
        theme: 'grid',
        styles: {
          textColor: [54, 31, 24],
          fontSize: 10,
          cellPadding: 2,
          overflow: 'linebreak',
          minCellHeight: 20,
        },
        headStyles: {
          fillColor: [163, 103, 80],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: {
          fillColor: [239, 239, 239]
        },
        tableLineColor: [54, 31, 24],
        tableLineWidth: 0.75,
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
        },
        margin: { left: padding, right: padding }
      });
    }

    // Abrir el PDF en una nueva pestaña
    window.open(doc.output('bloburl'));
}

  onRowSelected(row: any) {
    this.selectedAlumno = row;
    this.loadProgramas(); // Cargar programas del alumno seleccionado
  }

  mostrarCard(): boolean {
    return this.selectedAlumno ? true : false;
  }
}
