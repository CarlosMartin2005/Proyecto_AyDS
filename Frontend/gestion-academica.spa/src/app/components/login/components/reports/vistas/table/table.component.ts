import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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

  displayedColumns: string[] = [];
  dataSource: any[] = [];

  currentDate: string = '';

  currentPage = 1;
  itemsPerPage = 10;
  pagedItems: any[] = [];
  pages: number[] = [];
  totalPages!: number;

  ngOnInit() {
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
}