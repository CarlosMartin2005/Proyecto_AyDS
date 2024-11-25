import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() reportTitle!: string;
  @Input() columnConfig: any[] = [];
  @Input() data: any[] = [];
  @Input() logoUrl: string = '../../../../../../assets/logo.png'; // URL por defecto del logo

  displayedColumns: string[] = [];
  dataSource: any[] = [];

  currentDate: string = '';

  currentPage = 1;
  itemsPerPage = 10;
  pagedItems: any[] = [];
  pages: number[] = [];
  totalPages!: number;

  ngOnInit() {
    // Inicializamos `columnConfig` con columnas esenciales y sus prioridades
    if (!this.columnConfig.length) {
      this.columnConfig = [
        { key: 'dni', label: 'DNI', priority: 1 },
        { key: 'name', label: 'Name', priority: 2 },
        { key: 'apellidos', label: 'Apellidos', priority: 3 },
        { key: 'correo', label: 'Correo', priority: 4 },
        { key: 'programas', label: 'Programas', priority: 5 },
        { key: 'cursos', label: 'Cursos', priority: 6 },
        // { key: 'fechaNacimiento', label: 'Fecha de Nacimiento', priority: 7 },
        // { key: 'horario', label: 'Horario', priority: 8 },
      ];
    }
    this.displayedColumns = this.columnConfig.map(col => col.key);
    this.dataSource = this.data;
    this.updatePagination();
    this.currentDate = new Date().toLocaleDateString();
  }

  ngOnChanges() {
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (v, k) => k + 1);
    this.setPage(1);
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    this.pagedItems = this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  abrirModal(element: any) {
    // Lógica para abrir el modal
  }

  editar(element: any) {
    // Lógica para editar el elemento
  }

  eliminar(element: any) {
    // Lógica para eliminar el elemento
  }

  getBadgeClass(element: any): string {
    return element.activo ? 'badge bg-success' : 'badge bg-danger';
  }

  // Función para formatear la fecha
  formatFechaNacimiento(fecha: string): string {
    const date = new Date(fecha);
    const yy = date.getFullYear().toString().slice(-2); // Últimos 2 dígitos del año
    const mm = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes
    const dd = date.getDate().toString().padStart(2, '0'); // Día
    return `${yy}/${mm}/${dd}`;
  }

  imprimirReporte() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const pageWidth = doc.internal.pageSize.width;
    const padding = 40; // Considera algo de espacio para padding
    const availableWidth = pageWidth - padding * 2;

    // Priorizar columnas y excluir las no deseadas explícitamente
    const prioritizedColumns = this.columnConfig
      .filter(col => !['horario'].includes(col.key)) // Excluir 'horario'
      .sort((a, b) => a.priority - b.priority);

    const columnWidths = prioritizedColumns.map(col => ({
      ...col,
      width: doc.getTextWidth(col.label) + 20
    }));

    let totalWidth = columnWidths.reduce((acc, col) => acc + col.width, 0);

    // Asegurarnos de que siempre haya un logo
    const logoUrl = this.logoUrl;

    // Marca de agua
    const pageHeight = doc.internal.pageSize.height;
    doc.addImage(logoUrl, 'PNG', pageWidth / 4, pageHeight / 4, pageWidth / 2, pageHeight / 2, undefined, 'NONE');

    // Título del conservatorio
    doc.setFontSize(20);
    doc.text("Conservatorio Sampedrano de las Artes", doc.internal.pageSize.width / 2, 30, { align: 'center' });

    // Subtítulo del reporte y fecha actual
    doc.setFontSize(14);
    const currentDate = new Date().toLocaleDateString();
    doc.text(this.reportTitle, 14, 50);
    doc.text(currentDate, doc.internal.pageSize.width - 14, 50, { align: 'right' });

    // Generar la tabla con ajuste automático de columnas y texto envolvente
    autoTable(doc, {
      startY: 70,
      head: [prioritizedColumns.map(col => col.label)],
      body: this.data.map(row => prioritizedColumns.map(col => {
        if (col.key === 'fechaNacimiento') {
          return this.formatFechaNacimiento(row[col.key]);
        } else {
          return row[col.key];
        }
      })),
      theme: 'grid',
      styles: {
        textColor: [54, 31, 24], // Cuaternario para texto
        fontSize: 10, // Tamaño de fuente reducido
        cellPadding: 2,
        overflow: 'linebreak', // Ajuste de texto envolvente
        minCellHeight: 20, // Altura mínima de las celdas
      },
      headStyles: {
        fillColor: [163, 103, 80], // Cuaternario para el encabezado
        textColor: [255, 255, 255] // Blanco para el texto del encabezado
      },
      alternateRowStyles: {
        fillColor: [239, 239, 239] // Nuevo Color Terciario
      },
      tableLineColor: [54, 31, 24], // Cuaternario para bordes de la tabla
      tableLineWidth: 0.75,
      columnStyles: {
        // Ajustar el ancho de las columnas según sea necesario
        0: { cellWidth: 'auto' }, // La primera columna se ajustará automáticamente
        1: { cellWidth: 'auto' }, // La segunda columna se ajustará automáticamente
        // Puedes agregar más ajustes de columna según sea necesario
      }
    });

    // Abrir el PDF en una nueva pestaña
    window.open(doc.output('bloburl'));
  }
}
