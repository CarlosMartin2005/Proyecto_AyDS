import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../../otros/search-bar/search-bar.component';
import { ProgramasService } from '../../../../services/programas/programas.service';
import { DocentesService } from '../../../../services/docentes/docentes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../otros/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormateadorService } from '../../../../services/otros/formateador/formateador.service';
@Component({
  selector: 'app-programas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchBarComponent],
  templateUrl: './programas.component.html',
  styleUrl: './programas.component.scss'
})
export class ProgramasComponent {
  Math = Math; // Agregar esta línea

  constructor(private programasService: ProgramasService, private docentesServices: DocentesService, private snackBar: MatSnackBar, public dialog: MatDialog, private formateador: FormateadorService) {
    this.docentesServices.getDocentes().subscribe((res: any) => {
      this.docentes = res.map((docente: any) => {
        return {
          nombre: docente.nombre + ' ' + docente.apellido,
          especialidad: docente.especialidad,
          id: docente.id
        }
      });
    });
  }
  programas = [
    {
      id: 1,
      nombre: 'Programa 1',
      descripcion: 'Descripción del Programa 1',
      fechaCreacion: '2021-01-01',
      ultimaActualizacion: '2021-06-01',
      cursos: [
        {
          id: 1,
          docente_id: 1,
          nombre: 'Curso 1',
          descripcion: 'Descripción del Curso 1',
          docente: 'Docente 1',
          horario: 'Lunes 10:00-12:00',
          fechaCreacion: '2021-01-01',
          ultimaActualizacion: '2021-06-01'
        },
        {
          id: 2,
          docente_id: 2,
          nombre: 'Curso 2',
          descripcion: 'Descripción del Curso 2',
          docente: 'Docente 2',
          horario: 'Martes 14:00-16:00',
          fechaCreacion: '2021-02-01',
          ultimaActualizacion: '2021-07-01'
        }
      ]
    },
    {
      id: 2,
      nombre: 'Programa 2',
      descripcion: 'Descripción del Programa 2',
      fechaCreacion: '2021-02-01',
      ultimaActualizacion: '2021-07-01',
      cursos: [
        {
          id: 3,
          docente_id: 3,
          nombre: 'Curso 3',
          descripcion: 'Descripción del Curso 3',
          docente: 'Docente 3',
          horario: 'Miércoles 10:00-12:00',
          fechaCreacion: '2021-03-01',
          ultimaActualizacion: '2021-08-01'
        },
        {
          id: 4,
          docente_id: 4,
          nombre: 'Curso 4',
          descripcion: 'Descripción del Curso 4',
          docente: 'Docente 4',
          horario: 'Jueves 14:00-16:00',
          fechaCreacion: '2021-04-01',
          ultimaActualizacion: '2021-09-01'
        }
      ]
    },
    // ...otros programas...
  ];

  programasPaginados: any[] = [];
  cursosPaginados: any[] = [];
  programasPaginaActual: number = 1;
  cursosPaginaActual: number = 1;
  elementosPorPagina: number = 5;

  docentes = [
    { nombre: 'Docente 1', especialidad: 'Especialidad 1', id: 1 },
    { nombre: 'Docente 2', especialidad: 'Especialidad 2', id: 2 },
    { nombre: 'Docente 3', especialidad: 'Especialidad 3', id: 3 },
    // ...otros docentes...
  ]

  docentesColumns = {
    'nombre': 'Nombre',
    'especialidad': 'Especialidad',
  }

  ngOnInit() {
    this.loadProgramas();
    this.paginarProgramas();
  }

  loadProgramas() {
    this.programasService.getProgramas().subscribe((res: any) => {
      this.programas = res;
      this.paginarProgramas();
    });
  }

  paginarProgramas() {
    const inicio = (this.programasPaginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.programasPaginados = this.programas.slice(inicio, fin);
  }

  cambiarPaginaProgramas(pagina: number) {
    if (pagina > 0 && pagina <= Math.ceil(this.programas.length / this.elementosPorPagina)) {
      this.programasPaginaActual = pagina;
      this.paginarProgramas();
    }
  }

  siguientePaginaProgramas() {
    if (this.programasPaginaActual < Math.ceil(this.programas.length / this.elementosPorPagina)) {
      this.programasPaginaActual++;
      this.paginarProgramas();
    }
  }

  anteriorPaginaProgramas() {
    if (this.programasPaginaActual > 1) {
      this.programasPaginaActual--;
      this.paginarProgramas();
    }
  }

  cambiarPaginaCursos(pagina: number) {
    if (pagina > 0 && pagina <= Math.ceil(this.programaSeleccionado.cursos.length / this.elementosPorPagina)) {
      this.cursosPaginaActual = pagina;
      this.paginarCursos();
    }
  }

  siguientePaginaCursos() {
    if (this.cursosPaginaActual < Math.ceil(this.programaSeleccionado.cursos.length / this.elementosPorPagina)) {
      this.cursosPaginaActual++;
      this.paginarCursos();
    }
  }

  anteriorPaginaCursos() {
    if (this.cursosPaginaActual > 1) {
      this.cursosPaginaActual--;
      this.paginarCursos();
    }
  }

  programaSeleccionado: any = null;
  cursoSeleccionado: any = null;
  editandoPrograma: boolean = false;
  editandoCurso: boolean = false;
  agregandoPrograma: boolean = false;
  agregandoCurso: boolean = false;
  nuevoPrograma: any = { nombre: '', descripcion: '' };
  nuevoCurso: any = { nombre: '', descripcion: '', docente: 'Busque un docente', horario: '' };
  tempPrograma: any = {};
  tempCurso: any = {};

  seleccionarPrograma(programa: any) {
    this.programaSeleccionado = programa;
    this.cursoSeleccionado = null;
    this.editandoPrograma = false;
    this.editandoCurso = false;
    this.agregandoPrograma = false;
    this.agregandoCurso = false;
    this.paginarCursos();
  }

  paginarCursos() {
    if (this.programaSeleccionado) {
      const inicio = (this.cursosPaginaActual - 1) * this.elementosPorPagina;
      const fin = inicio + this.elementosPorPagina;
      this.cursosPaginados = this.programaSeleccionado.cursos.slice(inicio, fin);
    }
  }

  seleccionarCurso(curso: any) {
    this.cursoSeleccionado = curso;
    this.editandoCurso = false;
    this.agregandoCurso = false;
  }

  eliminarPrograma(programa: any) {
    console.log('Programa a eliminar:', programa);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar el elemento?',

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (programa.cursos.length > 0 || programa.cursos !== null) {
          programa.cursos.forEach((curso: any) => {
            this.programasService.deleteCursos(curso.id).subscribe((res: any) => {
              console.log('Curso eliminado:', res);
            },
              (error) => {
                console.error('Error al eliminar el curso:', error);
              });
          });
        }
        this.programasService.deleteProgramas(programa.id).subscribe((res: any) => {
          console.log('Programa eliminado:', res);
          this.snackBar.open('Programa Eliminado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['mensage-exito']
          });
          this.programas = this.programas.filter(p => p !== programa);
          if (this.programaSeleccionado === programa) {
            this.programaSeleccionado = null;
            this.cursoSeleccionado = null;
          }
          location.reload()
        },
          (error) => {
            this.snackBar.open(error.error.message, 'Cerrar', {
              duration: 10000,
              panelClass: ["mensaje-error"],
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
            console.error('Error al eliminar el programa:', error);
          });
      }
    });
  }

  eliminarCurso(curso: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar el elemento?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.programasService.deleteCursos(curso.id).subscribe((res: any) => {
          console.log('Curso eliminado:', res);
          this.snackBar.open('Curso Eliminado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['mensage-exito']
          });
          this.programaSeleccionado.cursos = this.programaSeleccionado.cursos.filter((c: any) => c !== curso);
          if (this.cursoSeleccionado === curso) {
            this.cursoSeleccionado = null;
          }
          location.reload()
        },
          (error) => {
            this.snackBar.open(error.error.message, 'Cerrar', {
              duration: 10000,
              panelClass: ["mensaje-error"],
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
            console.error('Error al eliminar el curso:', error);
          });
      }
    });
  }

  editarPrograma() {
    this.editandoPrograma = true;
    this.tempPrograma = { ...this.programaSeleccionado };
  }

  guardarPrograma() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro que desea guardar los cambios?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.tempPrograma && this.tempPrograma.nombre.trim() !== '') {
          const programaEditado = {
            ...this.tempPrograma,
            ultimaActualizacion: new Date().toISOString().split('T')[0]
          };
          console.log('Programa Editado:', programaEditado);
          this.snackBar.open('Programa Editado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['mensage-exito']
          });
          this.programasService.editProgramas(programaEditado).subscribe((res: any) => {
            console.log('Programa editado:', res);
            Object.assign(this.programaSeleccionado, this.tempPrograma);
            this.editandoPrograma = false;
            this.snackBar.open('Programa editado', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mensage-exito']
            });
            location.reload()
          },
            (error) => {
              this.snackBar.open(error.error.message, 'Cerrar', {
                duration: 10000,
                panelClass: ["mensaje-error"],
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
              console.error('Error al editar el programa:', error);
            });
        } else {
          this.snackBar.open('El nombre del programa no puede estar vacío', 'Cerrar', {
            duration: 3000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }
      }
    });
  }

  editarCurso() {
    this.editandoCurso = true;
    this.tempCurso = { ...this.cursoSeleccionado };
  }

  guardarCurso() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro que desea guardar los cambios?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.tempCurso && this.tempCurso.nombre.trim() !== '') {
          const cursoEditado = {
            ...this.tempCurso,
            programa_id: this.programaSeleccionado.id,
            ultimaActualizacion: new Date().toISOString().split('T')[0]
          };
          console.log('Curso Editado:', cursoEditado);
          this.programasService.editCursos(cursoEditado).subscribe((res: any) => {
            console.log('Curso editado:', res);
            this.snackBar.open('Curso Editado', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mensage-exito']
            });
            Object.assign(this.cursoSeleccionado, this.tempCurso);
            this.editandoCurso = false;
            location.reload()
          },
            (error) => {
              this.snackBar.open(error.error.message, 'Cerrar', {
                duration: 10000,
                panelClass: ["mensaje-error"],
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
              console.error('Error al editar el curso:', error);
            });
        } else {
          this.snackBar.open('El nombre del curso no puede estar vacío', 'Cerrar', {
            duration: 3000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }
      }
    });
  }

  agregarPrograma() {
    this.agregandoPrograma = true;
    this.programaSeleccionado = null;
    this.cursoSeleccionado = null;
  }

  guardarNuevoPrograma() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar creación',
        message: '¿Está seguro que desea crear el nuevo programa?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.nuevoPrograma.nombre.trim() !== '') {
          const nuevoPrograma = {
            ...this.nuevoPrograma,
            fechaCreacion: new Date().toISOString().split('T')[0],
            ultimaActualizacion: new Date().toISOString().split('T')[0],
            cursos: []
          };
          console.log('Nuevo Programa:', nuevoPrograma);
          this.programasService.addProgramas(nuevoPrograma).subscribe((res: any) => {
            console.log('Programa agregado:', res);
            this.snackBar.open('Programa agregado', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mensage-exito']
            });
            this.programas.push(nuevoPrograma);
            this.loadProgramas();
            this.nuevoPrograma = { nombre: '', descripcion: '' };
            this.agregandoPrograma = false;
            location.reload()
          },
            (error) => {
              this.snackBar.open(error.error.message, 'Cerrar', {
                duration: 10000,
                panelClass: ["mensaje-error"],
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
              console.error('Error al agregar el curso:', error);
            });
        } else {
          this.snackBar.open('El nombre del programa no puede estar vacío', 'Cerrar', {
            duration: 3000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }
      }
    });
  }

  cancelarAgregarPrograma() {
    this.nuevoPrograma = { nombre: '', descripcion: '' };
    this.agregandoPrograma = false;
  }

  agregarCurso() {
    this.agregandoCurso = true;
    this.cursoSeleccionado = null;
    this.nuevoCurso = { nombre: '', descripcion: '', docente: 'Busque un docente', horario: '' };
  }

  guardarNuevoCurso() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar creación',
        message: '¿Está seguro que desea crear el nuevo curso?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.programaSeleccionado) {
          if (this.nuevoCurso.nombre.trim() !== '') {
            const nuevoCurso = {
              ...this.nuevoCurso,
              programa_id: this.programaSeleccionado.id,
              fechaCreacion: new Date().toISOString().split('T')[0],
              ultimaActualizacion: new Date().toISOString().split('T')[0]
            };
            console.log('Nuevo Curso:', nuevoCurso);
            this.programasService.addCursos(nuevoCurso).subscribe((res: any) => {
              console.log('Curso agregado:', res);
              this.snackBar.open('Curso agregado', 'Cerrar', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: ['mensage-exito']
              });
              this.programaSeleccionado.cursos.push(nuevoCurso);
              this.loadProgramas();
              this.nuevoCurso = { nombre: '', descripcion: '', docente: 'Busque un docente', horario: '' };
              this.agregandoCurso = false;
              location.reload()
            },
              (error) => {
                this.snackBar.open(error.error.message, 'Cerrar', {
                  duration: 10000,
                  panelClass: ["mensaje-error"],
                  verticalPosition: 'bottom',
                  horizontalPosition: 'right'
                });
                console.error('Error al agregar el curso:', error);
              });

          } else {
            this.snackBar.open('El nombre del curso no puede estar vacío', 'Cerrar', {
              duration: 3000,
              panelClass: ["mensaje-error"],
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          }
        }
      }
    });
  }

  cancelarAgregarCurso() {
    this.nuevoCurso = { nombre: '', descripcion: '', docente: 'Busque un docente', horario: '' };
    this.agregandoCurso = false;
  }

  onRowSelected(row: any) {
    this.nuevoCurso.docente = row.nombre;
    this.nuevoCurso.docente_id = row.id;
  }

  onRowSelectedEdit(row: any) {
    this.tempCurso.docente = row.nombre;
    this.tempCurso.docente_id = row.id;
  }

  formatearFecha(fecha: string, tipo: string = '') {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fechaArray: any = this.formateador.convertirFechaMySQLaStandarWeb(fecha)

    let fechaFormateada = fechaArray[3] + ' de ' + meses[parseInt(fechaArray[2]) - 1] + ' de ' + fechaArray[1];

    if(tipo === 'conHora') {
      fechaFormateada += ' a las ' + this.formateador.convertirFechaMySQLaStandarWeb(fecha)[4] + ':' + this.formateador.convertirFechaMySQLaStandarWeb(fecha)[5];
    }
    return fechaFormateada;
  }


}
