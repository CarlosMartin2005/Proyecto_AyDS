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
    const pageHeight = doc.internal.pageSize.height;
    const padding = 40;
    const logoUrl = this.logoUrl;
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

    // Subtítulo del reporte y fecha actual
    doc.setFontSize(14);
    const currentDate = new Date().toLocaleDateString();
    doc.text(currentDate, pageWidth - padding - 10, 50, { align: 'right' });
    doc.text(this.reportTitle, padding + 80, 80, { align: 'left' });

    // Priorizar columnas y excluir las no deseadas explícitamente
    const prioritizedColumns = this.columnConfig
      .filter(col => !['horario'].includes(col.key)) // Excluir 'horario'
      .sort((a, b) => a.priority - b.priority);

    // Generar la tabla con ajuste automático de columnas y texto envolvente
    autoTable(doc, {
      startY: 120,
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
        textColor: [54, 31, 24],
        fontSize: 8, // Tamaño del texto reducido
        cellPadding: 2,
        overflow: 'linebreak',
        minCellHeight: 20,
        valign: 'middle',
        halign: 'center'
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
        1: { cellWidth: 'auto' }
      }
    });

    // Pie de página con número de página
    const totalPages = doc.internal.pages.length - 1;

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor("#000000"); // Color negro para el pie de página
      doc.text(`Página ${i} de ${totalPages}`, pageWidth - padding, pageHeight - 30, { align: 'right' });
    }

    // Abrir el PDF en una nueva pestaña
    window.open(doc.output('bloburl'));
  }

}
