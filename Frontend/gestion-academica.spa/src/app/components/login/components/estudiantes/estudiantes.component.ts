import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { SearchBarComponent } from '../../../../otros/search-bar/search-bar.component';
import { DocentesService } from '../../../../services/docentes/docentes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../otros/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormateadorService } from '../../../../services/otros/formateador/formateador.service';
import { MatriculaService } from '../../../../services/matricula/matricula.service';
import { EstudiantesService } from '../../../../services/estudiantes/estudiantes.service';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent {
  Math = Math;
  editandoEstudiante: boolean = false;
  editarEstudianteForm: FormGroup;
  editandoMatricula: boolean = false;
  editarMatriculaForm: FormGroup;
  cursosSeleccionados: any[] = [];
  programaPrincipalSeleccionado: string | null = null;
  estudiantesPaginados: any[] = [];
  cursosPaginados: any[] = [];
  estudiantesPaginaActual: number = 1;
  cursosPaginaActual: number = 1;
  elementosPorPagina: number = 5;

  constructor(
    private formBuilder: FormBuilder,
    private docentesService: DocentesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formateadorService: FormateadorService,
    private matriculaService: MatriculaService,
    private estudiantesService: EstudiantesService
  ) {
    this.editarEstudianteForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      identidad: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{5}$/)]],
      fecha_de_nacimiento: ['', Validators.required],
      status: [false],
      numeroCuenta: ['']
    });

    this.editarMatriculaForm = this.formBuilder.group({
      programa: ['', Validators.required],
      cursos: this.formBuilder.array([])
    });

    this.loadData();
  }
  estudiantes: any[] = [
    {
      id: "10",
      nombres: "Miguel",
      apellidos: "Hernández",
      email: "miguel.hernandez@example.com",
      numeroCuenta: null,
      identidad: "9988776655",
      fecha_de_nacimiento: "2004-05-05T06:00:00.000Z",
      status: "A",
      fecha_creacion: "2024-11-26T20:53:29.000Z",
      fecha_matricula: "2024-12-01T23:58:30.000Z",
      programas: [
        {
          id: 3,
          nombre: "Cursos libres",
          cursos: [
            {
              id: 10,
              nombre: "Batería Avanzada",
              horario: "Lunes a Viernes, 10:00 - 12:00",
              descripcion: "Curso de batería avanzado",
              fecha_creacion: "2024-11-26T20:53:30.000Z",
              docente_id: "7",
              fecha_fin: null
            },
            {
              id: 9,
              nombre: "Batería Básica",
              horario: "Lunes a Viernes, 8:00 - 10:00",
              descripcion: "Curso de batería para principiantes",
              fecha_creacion: "2024-11-26T20:53:30.000Z",
              docente_id: "7",
              fecha_fin: null
            }
          ]
        }
      ],
    }
  ];

  docentes: any[] = [
    {
      id: 7,
      nombres: "Juan",
      apellidos: "Pérez",
      email: "example@docente.com",
      numeroCuenta: null,
      identidad: "1234567890",
      fecha_de_nacimiento: "1970-01-01T06:00:00.000Z",
      status: "A",
    }
  ]
  programas = [
    {
      id: 1,
      nombre: 'Pequeños Artistas',
      descripcion: 'Niños y niñas de 3 a 10 años',
      seleccionado: false,
      cursos: [
        {
          id: 1,
          nombre: 'Curso 1',
          dia: 'Lunes',
          docente: 'Docente 1',
          hora: '10:00 - 12:00',
          seleccionado: false
        },
        {
          id: 2,
          nombre: 'Curso 2',
          dia: 'Miércoles',
          docente: 'Docente 2',
          hora: '14:00 - 16:00',
          seleccionado: false
        },
      ]
    },
    {
      id: 2,
      nombre: 'Programa Juvenil',
      descripcion: 'Edades de 11 años en adelante',
      seleccionado: false,
      cursos: [
        {
          id: 3,
          nombre: 'Curso 1',
          dia: 'Lunes',
          docente: 'Docente 1',
          hora: '10:00 - 12:00',
          seleccionado: false
        },
        {
          id: 4,
          nombre: 'Curso 2',
          dia: 'Miércoles',
          docente: 'Docente 2',
          hora: '14:00 - 16:00',
          seleccionado: false
        },
      ]
    },
    {
      id: 3,
      nombre: 'Cursos libres',
      descripcion: 'No hay límites de edad.',
      seleccionado: false,
      cursos: [
        {
          id: 5,
          nombre: 'Curso 1',
          dia: 'Lunes',
          docente: 'Docente 1',
          hora: '10:00 - 12:00',
          seleccionado: false
        },
        {
          id: 6,
          nombre: 'Curso 2',
          dia: 'Miércoles',
          docente: 'Docente 2',
          hora: '14:00 - 16:00',
          seleccionado: false
        },
      ]
    }
  ];

  loadData(){
    this.estudiantesService.getEstudiantesInfo().subscribe({
      next: (data: any) => {
        this.estudiantes = data.map((estudiante: any, index: number) => {
          return {
            id: estudiante.id,
            nombres: estudiante.nombres,
            apellidos: estudiante.apellidos,
            email: estudiante.email,
            numeroCuenta: estudiante.numeroCuenta,
            identidad: estudiante.identidad,
            fecha_de_nacimiento: estudiante.fecha_de_nacimiento,
            status: estudiante.activo,
            fecha_creacion: estudiante.fecha_creacion,
            fecha_matricula: estudiante.fecha_matricula,
            programas: estudiante.programas.map((programa: any) => ({
              id: programa.id,
              nombre: programa.nombre,
              cursos: programa.cursos.map((curso: any) => ({
                id: curso.id,
                nombre: curso.nombre,
                horario: curso.horario,
                descripcion: curso.descripcion,
                fecha_creacion: curso.fecha_creacion,
                docente_id: curso.docente_id,
                fecha_fin: curso.fecha_fin
              }))
            }))
          };
        });
        console.log('Estudiantes cargados:', data);
        this.paginarEstudiantes();
      },
      error: (error) => {
        console.error('Error al cargar los datos de estudiantes:', error);
      }
    });

    this.docentesService.getDocentes().subscribe({
      next: (data: any) => {
        // solo los datos de docentes
        this.docentes = data.map((docente: any) => {
          return {
            id: docente.id,
            nombres: docente.nombre,
            apellidos: docente.apellido,
            email: docente.email,
            numeroCuenta: docente.numeroCuenta,
            identidad: docente.identidad,
            fecha_de_nacimiento: docente.fechaNacimiento,
            status: docente.status,
          };
        });
        console.log('Docentes cargados:',data);
      },
      error: (error) => {
        console.error('Error al cargar los datos de docentes:', error);
      }
    });

    this.matriculaService.getProgramas().subscribe((data: any) => {
      this.programas = data.map((programa: any) => ({
        ...programa,
        seleccionado: false,
        cursos: programa.cursos.map((curso: any) => ({
          ...curso,
          seleccionado: false
        }))
      }));
    });


  }

  estudianteSeleccionado: any = null;
  programaSeleccionado: any = null;
  cursoSeleccionado: any = null;
  docenteSeleccionado: any = null;

  seleccionarEstudiante(estudiante: any) {
    console.log(estudiante);
    estudiante.status = estudiante.status;
    this.estudianteSeleccionado = estudiante;
    this.programaSeleccionado = estudiante.programas[0];
    this.cursoSeleccionado = null;
    this.docenteSeleccionado = null;
    this.cursosSeleccionados = this.programaSeleccionado ? this.programaSeleccionado.cursos : [];
    this.cursosPaginaActual = 1; // Reiniciar la página de cursos al seleccionar un estudiante
    this.paginarCursos();
  }

  cambiarPrograma() {
    this.cursoSeleccionado = null;
    this.docenteSeleccionado = null;
    this.cursosPaginaActual = 1; // Reiniciar la página de cursos al cambiar de programa
    this.cursosSeleccionados = this.programaSeleccionado ? this.programaSeleccionado.cursos : [];
    this.paginarCursos();
  }

  seleccionarCurso(curso: any) {
    this.cursoSeleccionado = curso;
    this.docenteSeleccionado = this.docentes.find(docente => docente.id == curso.docente_id);
  }

  obtenerNombreDocente(docenteId: string) {
    const docente = this.docentes.find(docente => docente.id == docenteId);
    return docente ? `${docente.nombres} ${docente.apellidos}` : 'Desconocido';
  }

  eliminarEstudiante(estudiante: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar el estudiante?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.estudiantesService.deleteEstudiante(estudiante.id).subscribe(() => {
          this.estudiantes = this.estudiantes.filter((e: any) => e.id !== estudiante.id);
          this.estudianteSeleccionado = null;
          this.snackBar.open('Estudiante Eliminado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['mensage-exito']
          });
          this.loadData();
        }, (error: any) => {
          this.snackBar.open('Error al eliminar estudiante ' + error.error.message, 'Cerrar', {
            duration: 10000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        });
      }
    });
  }

  calcularEdad(fechaNacimiento: string): number {
    const fechaNac = new Date(fechaNacimiento);
    const diferenciaMs = Date.now() - fechaNac.getTime();
    const edadDt = new Date(diferenciaMs);
    return Math.abs(edadDt.getUTCFullYear() - 1970);
  }

  editarEstudiante() {
    this.editandoEstudiante = true;
    this.editarEstudianteForm.patchValue({
      nombres: this.estudianteSeleccionado.nombres,
      apellidos: this.estudianteSeleccionado.apellidos,
      email: this.estudianteSeleccionado.email,
      identidad: this.estudianteSeleccionado.identidad,
      fecha_de_nacimiento: this.estudianteSeleccionado.fecha_de_nacimiento,
      status: this.estudianteSeleccionado.status === 'Activo',
      numeroCuenta: this.estudianteSeleccionado.numeroCuenta
    });
  }

  guardarEstudiante() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro que desea guardar los cambios?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editarEstudianteForm.valid) {
          const updatedEstudiante = {
            id: this.estudianteSeleccionado.id,
            nombre: this.editarEstudianteForm.value.nombres,
            apellido: this.editarEstudianteForm.value.apellidos,
            email: this.editarEstudianteForm.value.email,
            identidad: this.editarEstudianteForm.value.identidad,
            fechaNacimiento: this.formateadorService.convertirFechaMySQLaStandarWeb(this.editarEstudianteForm.value.fecha_de_nacimiento)[6],
            status: this.editarEstudianteForm.value.status ? 'Activo' : 'Inactivo'
          };
          console.log(this.editarEstudianteForm.value.status);

          console.log(updatedEstudiante);
          this.estudiantesService.updateEstudiante(updatedEstudiante).subscribe(() => {
            Object.assign(this.estudianteSeleccionado, updatedEstudiante);
            this.editandoEstudiante = false;
            this.snackBar.open('Estudiante actualizado', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mensage-exito']
            });
            this.loadData();
          }, (error: any) => {
            console.log(error);
            this.snackBar.open('Error al actualizar estudiante ' + error.error, 'Cerrar', {
              duration: 10000,
              panelClass: ["mensaje-error"],
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          });
        } else {
          this.snackBar.open('Por favor, complete todos los campos correctamente.', 'Cerrar', {
            duration: 3000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }
      }
    });
  }

  editarMatricula() {
    this.editandoMatricula = true;

    // Seleccionar el primer programa seleccionado por defecto
    const programaSeleccionado = this.estudianteSeleccionado.programas.find((p: any) => p.seleccionado) || this.estudianteSeleccionado.programas[0];
    this.programaSeleccionado = programaSeleccionado;

    this.editarMatriculaForm.patchValue({
      programa: this.programaSeleccionado,
      cursos: this.programaSeleccionado.cursos
    });

    // Marcar los programas y cursos seleccionados
    this.programas.forEach(programa => {
      programa.seleccionado = this.estudianteSeleccionado.programas.some((p: any) => p.id === programa.id);
      programa.cursos.forEach(curso => {
        curso.seleccionado = this.estudianteSeleccionado.programas.some((p: any) =>
          p.cursos.some((c: any) => c.id === curso.id)
        );
      });
    });

    this.cursosSeleccionados = this.programaSeleccionado.cursos;
  }

  getSelectedProgramas() {
    return this.programas.filter(programa => programa.seleccionado);
  }

  guardarMatricula() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro que desea guardar los cambios en la matrícula?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editarMatriculaForm.valid) {
          const selectedProgramas = this.programas
            .filter(programa => programa.seleccionado)
            .map(programa => ({
              id: programa.id,
              nombre: programa.nombre,
              cursos: programa.cursos.filter(curso => curso.seleccionado)
            }));

          const updatedMatricula = {
            id_estudiante: this.estudianteSeleccionado.id,
            programas: selectedProgramas
          };

          console.log(updatedMatricula);
          this.estudiantesService.updateMatricula(updatedMatricula).subscribe(() => {
            Object.assign(this.programaSeleccionado, updatedMatricula);
            this.editandoMatricula = false;
            this.snackBar.open('Matrícula actualizada', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mensage-exito']
            });
            this.loadData();

          }, (error: any) => {
            console.log(error);
            this.snackBar.open('Error al actualizar matrícula ' + error.error, 'Cerrar', {
              duration: 10000,
              panelClass: ["mensaje-error"],
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          });
        } else {
          this.snackBar.open('Por favor, complete todos los campos correctamente.', 'Cerrar', {
            duration: 3000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }
      }
    });
  }

  toggleSeleccionarPrograma(programa: any): void {
    if (programa.nombre === 'Cursos libres') {
      programa.seleccionado = !programa.seleccionado;
    } else {
      if (this.programaPrincipalSeleccionado && this.programaPrincipalSeleccionado !== programa.nombre) {
        this.snackBar.open('Solo puede seleccionar uno de los dos primeros programas', 'Cerrar', {
          duration: 5000,
          panelClass: ["mensaje-error"],
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }
      programa.seleccionado = !programa.seleccionado;
      this.programaPrincipalSeleccionado = programa.seleccionado ? programa.nombre : null;
    }
  }

  onHorarioChange() {
    const programaSeleccionado = this.editarMatriculaForm.get('programa')?.value;
    this.cursosSeleccionados = programaSeleccionado ? programaSeleccionado.cursos : [];
  }

  toggleSeleccionarCurso(curso: any): void {
    curso.seleccionado = !curso.seleccionado;
    const cursosControl = this.editarMatriculaForm.get('cursos');
    if (curso.seleccionado) {
      cursosControl?.setValue([...cursosControl.value, curso.nombre]);
    } else {
      cursosControl?.setValue(cursosControl.value.filter((nombre: string) => nombre !== curso.nombre));
    }
  }

  paginarEstudiantes() {
    const inicio = (this.estudiantesPaginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.estudiantesPaginados = this.estudiantes.slice(inicio, fin);
  }

  cambiarPaginaEstudiantes(pagina: number) {
    if (pagina > 0 && pagina <= Math.ceil(this.estudiantes.length / this.elementosPorPagina)) {
      this.estudiantesPaginaActual = pagina;
      this.paginarEstudiantes();
    }
  }

  siguientePaginaEstudiantes() {
    if (this.estudiantesPaginaActual < Math.ceil(this.estudiantes.length / this.elementosPorPagina)) {
      this.estudiantesPaginaActual++;
      this.paginarEstudiantes();
    }
  }

  anteriorPaginaEstudiantes() {
    if (this.estudiantesPaginaActual > 1) {
      this.estudiantesPaginaActual--;
      this.paginarEstudiantes();
    }
  }

  paginarCursos() {
    if (this.programaSeleccionado) {
      console.log(this.programaSeleccionado);
      const cursosDelPrograma = this.estudianteSeleccionado.programas.find((p: any) => p.id === this.programaSeleccionado.id)?.cursos || [];
      const inicio = (this.cursosPaginaActual - 1) * this.elementosPorPagina;
      const fin = inicio + this.elementosPorPagina;
      this.cursosPaginados = cursosDelPrograma.slice(inicio, fin);
    }
  }

  cambiarPaginaCursos(pagina: number) {
    if (pagina > 0 && pagina <= Math.ceil(this.programaSeleccionado!.cursos.length / this.elementosPorPagina)) {
      this.cursosPaginaActual = pagina;
      this.paginarCursos();
    }
  }

  siguientePaginaCursos() {
    if (this.cursosPaginaActual < Math.ceil(this.programaSeleccionado!.cursos.length / this.elementosPorPagina)) {
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

  formatearFecha(fecha: string, tipo: string = '') {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fechaArray: any = this.formateadorService.convertirFechaMySQLaStandarWeb(fecha)

    let fechaFormateada = fechaArray[3] + ' de ' + meses[parseInt(fechaArray[2]) - 1] + ' de ' + fechaArray[1];

    if(tipo === 'conHora') {
      fechaFormateada += ' a las ' + this.formateadorService.convertirFechaMySQLaStandarWeb(fecha)[4] + ':' + this.formateadorService.convertirFechaMySQLaStandarWeb(fecha)[5];
    }
    return fechaFormateada;
  }
}
