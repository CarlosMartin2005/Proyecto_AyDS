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

  displayedColumns: string[] = ['nombres', 'apellidos', 'nota', 'programa', 'curso', 'activo', 'acciones'];
  dataSource = [
    { nombres: 'Juan', apellidos: 'Pérez', nota: '12345', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Ana', apellidos: 'García', nota: '54321', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Luis', apellidos: 'Martínez', nota: '67890', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'María', apellidos: 'Rodríguez', nota: '23456', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Carlos', apellidos: 'López', nota: '34567', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Laura', apellidos: 'Martínez', nota: '45678', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Pedro', apellidos: 'González', nota: '56789', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Lucía', apellidos: 'Hernández', nota: '67890', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Jorge', apellidos: 'Ramírez', nota: '78901', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Marta', apellidos: 'Díaz', nota: '89012', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'José', apellidos: 'Morales', nota: '90123', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Paula', apellidos: 'Ortiz', nota: '12340', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Alberto', apellidos: 'Ruiz', nota: '23451', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Elena', apellidos: 'Jiménez', nota: '34562', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Rafael', apellidos: 'Vega', nota: '45673', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Carmen', apellidos: 'Romero', nota: '56784', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Ricardo', apellidos: 'Medina', nota: '67895', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Patricia', apellidos: 'Soto', nota: '78906', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Fernando', apellidos: 'Castillo', nota: '89017', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Sofía', apellidos: 'Serrano', nota: '90128', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Gabriel', apellidos: 'Rivera', nota: '12341', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Valentina', apellidos: 'Cruz', nota: '23452', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Daniel', apellidos: 'Torres', nota: '34563', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Adriana', apellidos: 'Delgado', nota: '45674', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Sergio', apellidos: 'Reyes', nota: '56785', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Isabel', apellidos: 'Molina', nota: '67896', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Alfonso', apellidos: 'Ramos', nota: '78907', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Alicia', apellidos: 'Pena', nota: '89018', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Gustavo', apellidos: 'Chávez', nota: '90129', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Rosario', apellidos: 'Gil', nota: '12342', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Enrique', apellidos: 'Méndez', nota: '23453', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Silvia', apellidos: 'Fuentes', nota: '34564', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Andrés', apellidos: 'Fernández', nota: '45675', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Gloria', apellidos: 'Espinosa', nota: '56786', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Manuel', apellidos: 'Rubio', nota: '67897', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Inés', apellidos: 'Campos', nota: '78908', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Francisco', apellidos: 'Guerrero', nota: '89019', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Eva', apellidos: 'Román', nota: '90130', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Pablo', apellidos: 'Blanco', nota: '12343', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Claudia', apellidos: 'Moreno', nota: '23454', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Héctor', apellidos: 'Castro', nota: '34565', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Teresa', apellidos: 'Sandoval', nota: '45676', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Ángel', apellidos: 'Suárez', nota: '56787', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Rebeca', apellidos: 'Aguilar', nota: '67898', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Víctor', apellidos: 'Valdez', nota: '78909', programa: 'Cursos libres', curso: 'Solfeo', activo: true },
    { nombres: 'Natalia', apellidos: 'Ortiz', nota: '89020', programa: 'Cursos libres', curso: 'Solfeo', activo: false },
    { nombres: 'Julio', apellidos: 'Flores', nota: '90131', programa: 'Cursos libres', curso: 'Solfeo', activo: true }
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
