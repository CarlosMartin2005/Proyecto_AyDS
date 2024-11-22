import { Component, OnInit,Input } from '@angular/core';
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

  displayedColumns: string[] = ['programas', 'cursos', 'horarios', 'activo', 'acciones'];
  dataSource = [
    { programas: 'Pequeños artistas', cursos: 'Violín', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Pintura', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo III', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Piano', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Danza', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo IV', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Guitarra', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Teatro', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo V', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Canto', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Escultura', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo VI', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Flauta', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Fotografía', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo VII', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Trompeta', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Artes Plásticas', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo VIII', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Violonchelo', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Dibujo', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo IX', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Contrabajo', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Cerámica', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo X', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Saxofón', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Escritura Creativa', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo XI', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Arpa', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Cine', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo XII', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Percusión', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Música Electrónica', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo XIII', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Tuba', horarios: '1300', activo: true },
    { programas: 'Programa Juvenil', cursos: 'Diseño Gráfico', horarios: '1500', activo: true },
    { programas: 'Cursos Libres', cursos: 'Solfeo XIV', horarios: '1500', activo: true },
    { programas: 'Pequeños artistas', cursos: 'Clarinete', horarios: '1300', activo: true },
  ];

  currentDate: string = '';

  currentPage = 1;
  itemsPerPage = 10;
  pagedItems: any[] = [];
  pages: number[] = [];
  totalPages!: number;

  ngOnInit() {
    this.totalPages = Math.ceil(this.dataSource.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (v, k) => k + 1);
    this.setPage(1);

    this.currentDate = new Date().toLocaleDateString();
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    this.pagedItems = this.dataSource.slice(startIndex, startIndex + this.itemsPerPage);
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

  getBadgeClass(element: any): string { return element.activo ? 'badge bg-success' : 'badge bg-danger'; }
}
