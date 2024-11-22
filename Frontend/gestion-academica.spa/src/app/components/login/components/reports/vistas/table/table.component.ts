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

  displayedColumns: string[] = ['nombres', 'apellidos', 'clave', 'activo', 'acciones'];
  dataSource = [
    { nombres: 'Juan', apellidos: 'Pérez', clave: '12345', activo: true },
    { nombres: 'Ana', apellidos: 'García', clave: '54321', activo: false },
    { nombres: 'Luis', apellidos: 'Martínez', clave: '67890', activo: true },
    { nombres: 'María', apellidos: 'Rodríguez', clave: '23456', activo: false },
    { nombres: 'Carlos', apellidos: 'López', clave: '34567', activo: true },
    { nombres: 'Laura', apellidos: 'Martínez', clave: '45678', activo: false },
    { nombres: 'Pedro', apellidos: 'González', clave: '56789', activo: true },
    { nombres: 'Lucía', apellidos: 'Hernández', clave: '67890', activo: false },
    { nombres: 'Jorge', apellidos: 'Ramírez', clave: '78901', activo: true },
    { nombres: 'Marta', apellidos: 'Díaz', clave: '89012', activo: false },
    { nombres: 'José', apellidos: 'Morales', clave: '90123', activo: true },
    { nombres: 'Paula', apellidos: 'Ortiz', clave: '12340', activo: false },
    { nombres: 'Alberto', apellidos: 'Ruiz', clave: '23451', activo: true },
    { nombres: 'Elena', apellidos: 'Jiménez', clave: '34562', activo: false },
    { nombres: 'Rafael', apellidos: 'Vega', clave: '45673', activo: true },
    { nombres: 'Carmen', apellidos: 'Romero', clave: '56784', activo: false },
    { nombres: 'Ricardo', apellidos: 'Medina', clave: '67895', activo: true },
    { nombres: 'Patricia', apellidos: 'Soto', clave: '78906', activo: false },
    { nombres: 'Fernando', apellidos: 'Castillo', clave: '89017', activo: true },
    { nombres: 'Sofía', apellidos: 'Serrano', clave: '90128', activo: false },
    { nombres: 'Gabriel', apellidos: 'Rivera', clave: '12341', activo: true },
    { nombres: 'Valentina', apellidos: 'Cruz', clave: '23452', activo: false },
    { nombres: 'Daniel', apellidos: 'Torres', clave: '34563', activo: true },
    { nombres: 'Adriana', apellidos: 'Delgado', clave: '45674', activo: false },
    { nombres: 'Sergio', apellidos: 'Reyes', clave: '56785', activo: true },
    { nombres: 'Isabel', apellidos: 'Molina', clave: '67896', activo: false },
    { nombres: 'Alfonso', apellidos: 'Ramos', clave: '78907', activo: true },
    { nombres: 'Alicia', apellidos: 'Pena', clave: '89018', activo: false },
    { nombres: 'Gustavo', apellidos: 'Chávez', clave: '90129', activo: true },
    { nombres: 'Rosario', apellidos: 'Gil', clave: '12342', activo: false },
    { nombres: 'Enrique', apellidos: 'Méndez', clave: '23453', activo: true },
    { nombres: 'Silvia', apellidos: 'Fuentes', clave: '34564', activo: false },
    { nombres: 'Andrés', apellidos: 'Fernández', clave: '45675', activo: true },
    { nombres: 'Gloria', apellidos: 'Espinosa', clave: '56786', activo: false },
    { nombres: 'Manuel', apellidos: 'Rubio', clave: '67897', activo: true },
    { nombres: 'Inés', apellidos: 'Campos', clave: '78908', activo: false },
    { nombres: 'Francisco', apellidos: 'Guerrero', clave: '89019', activo: true },
    { nombres: 'Eva', apellidos: 'Román', clave: '90130', activo: false },
    { nombres: 'Pablo', apellidos: 'Blanco', clave: '12343', activo: true },
    { nombres: 'Claudia', apellidos: 'Moreno', clave: '23454', activo: false },
    { nombres: 'Héctor', apellidos: 'Castro', clave: '34565', activo: true },
    { nombres: 'Teresa', apellidos: 'Sandoval', clave: '45676', activo: false },
    { nombres: 'Ángel', apellidos: 'Suárez', clave: '56787', activo: true },
    { nombres: 'Rebeca', apellidos: 'Aguilar', clave: '67898', activo: false },
    { nombres: 'Víctor', apellidos: 'Valdez', clave: '78909', activo: true },
    { nombres: 'Natalia', apellidos: 'Ortiz', clave: '89020', activo: false },
    { nombres: 'Julio', apellidos: 'Flores', clave: '90131', activo: true }
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
