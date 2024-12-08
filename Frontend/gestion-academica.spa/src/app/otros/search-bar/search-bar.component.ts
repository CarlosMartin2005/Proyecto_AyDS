import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnChanges {
  Math = Math; // Agregar esta línea
  @Input() datosExternos: any[] = [];
  @Input() columnasMostrar: { [key: string]: string } = {}; // Nueva propiedad
  @Output() rowSelected = new EventEmitter<any>(); // Nueva propiedad

  datos: any[] = [];
  dataSource: any;
  columnas: string[] = []; // Mover columnas aquí
  elementosPorPagina: number = 5;
  paginaActual: number = 1;
  datosPaginados: any[] = [];
  selectedRow: any = null; // Agregar esta línea

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.datosExternos.length ? this.datosExternos : this.datos);
    if (this.datosExternos.length) {
      this.columnas = Object.keys(this.datosExternos[0]).filter(column => column !== 'id');
    }
    this.paginarDatos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datosExternos']) {
      this.dataSource = new MatTableDataSource(this.datosExternos);
      if (this.datosExternos.length) {
        this.columnas = Object.keys(this.datosExternos[0]).filter(column => column !== 'id');
      }
    }
    this.paginarDatos();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  clearInput(event: Event) {
    event.preventDefault(); // Añadir esta línea
    this.dataSource.filter = '';
    (document.getElementById('default-search') as HTMLInputElement).value = '';
  }

  mostarTabla(): boolean {
    return (document.getElementById('default-search') as HTMLInputElement).value === '' ? false : true;
  }

  onRowClicked(row: any) {
    console.log(row);
    this.selectedRow = row; // Agregar esta línea
    this.rowSelected.emit(row); // Emitir la fila seleccionada
    this.clearInput(new Event('click')); // Borrar el contenido del input
  }

  getColumnName(column: string): string {
    return this.columnasMostrar[column] || column;
  }

  paginarDatos() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.datosPaginados = this.datosExternos.slice(inicio, fin);
  }

  cambiarPagina(pagina: number) {
    if (pagina > 0 && pagina <= Math.ceil(this.datosExternos.length / this.elementosPorPagina)) {
      this.paginaActual = pagina;
      this.paginarDatos();
    }
  }

  siguientePagina() {
    if (this.paginaActual < Math.ceil(this.datosExternos.length / this.elementosPorPagina)) {
      this.paginaActual++;
      this.paginarDatos();
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.paginarDatos();
    }
  }
}
