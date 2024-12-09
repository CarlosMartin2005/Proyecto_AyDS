import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { SearchBarComponent } from '../../../../otros/search-bar/search-bar.component';
import { DocentesService } from '../../../../services/docentes/docentes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../otros/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormateadorService } from '../../../../services/otros/formateador/formateador.service';
@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.scss'
})
export class DocentesComponent {
  Math = Math; // Agregar esta línea
  nuevoDocenteForm: FormGroup;
  editarDocenteForm: FormGroup;
  docentesPaginados: any[] = [];
  cursosPaginados: any[] = [];
  docentesPaginaActual: number = 1;
  cursosPaginaActual: number = 1;
  elementosPorPagina: number = 5;
  constructor(
    private fb: FormBuilder,
    private docentesService: DocentesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formateador: FormateadorService
  ) {
    this.nuevoDocenteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
      identidad: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{5}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      direccion: [''],
      status: [false],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      fechaNacimiento: ['', [Validators.required, this.validarEdadMinima(18)]]
    });

    this.editarDocenteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
      identidad: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{5}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      direccion: [''],
      status: [false],
      fechaNacimiento: ['', [Validators.required, this.validarEdadMinima(18)]]
    });
  }

  validarEdadMinima(edadMinima: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaNacimiento = new Date(control.value);
      const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
      return edad >= edadMinima ? null : { 'edadMinima': { value: control.value } };
    };
  }

  calcularEdad(fechaNacimiento: string): number {
    const fechaNac = new Date(fechaNacimiento);
    const diferenciaMs = Date.now() - fechaNac.getTime();
    const edadDt = new Date(diferenciaMs);
    return Math.abs(edadDt.getUTCFullYear() - 1970);
  }

  docentes = [
    {
      id: 1,
      nombre: 'Juan',
      email: 'docente1@example.com',
      apellido: 'Perez',
      identidad: '123456789',
      telefono: '123456789',
      direccion: 'Calle 123',
      status: 'Activo',
      fechaCreacion: '2021-01-01',
      ultimaActualizacion: '2021-01-01',
      especialidad: "Guitarra",
      seleccionado: false,
      cursos: [
        {
          id: 1,
          nombre: 'Guitarra',
          descripcion: 'Curso de guitarra',
          horario: 'Lunes a Viernes de 8:00 am a 10:00 am',
          fechaCreacion: '2021-01-01',
          ultimaActualizacion: '2021-01-01',
          seleccionado: false
        }
      ]
    },
    {
      id: 2,
      nombre: 'Maria',
      apellido: 'Lopez',
      email: 'docente2@example.com',
      identidad: '123456789',
      telefono: '123456789',
      direccion: 'Calle 123',
      status: 'Activo',
      fechaCreacion: '2021-01-01',
      ultimaActualizacion: '2021-01-01',
      especialidad: "Piano",
      seleccionado: false,
      cursos: [
        {
          id: 2,
          nombre: 'Piano',
          descripcion: 'Curso de piano',
          horario: 'Lunes a Viernes de 8:00 am a 10:00 am',
          fechaCreacion: '2021-01-01',
          ultimaActualizacion: '2021-01-01',
          seleccionado: false
        }
      ]
    }
  ];

  docenteSeleccionado: any = null;
  cursoSeleccionado: any = null;
  editandoDocente: boolean = false;
  agregandoDocente: boolean = false;
  nuevoDocente: any = { nombre: '', apellido: '', email: '', especialidades: '', identidad: '', telefono: '', direccion: '', status: false };
  tempDocente: any = {};

  ngOnInit() {
    this.loadDocentes();
  }

  loadDocentes() {
    this.docentesService.getDocentes().subscribe((docentes: any) => {
      this.docentes = docentes.map((docente: any) => {
        // si estatus es A -> Activo, si es I -> Inactivo
        docente.status = docente.status === 'A' ? 'Activo' : 'Inactivo';
        // docente.fechaNacimiento = this.formateador.convertirFechaMySQLaStandarWeb(docente.fechaNacimiento)[0];
        docente.seleccionado = false;
        docente.cursos = docente.cursos.map((curso: any) => {
          curso.seleccionado = false;
          return curso;
        });
        return docente;
      });
      this.paginarDocentes();
    });
  }

  paginarDocentes() {
    const inicio = (this.docentesPaginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.docentesPaginados = this.docentes.slice(inicio, fin);
  }

  cambiarPaginaDocentes(pagina: number) {
    if (pagina > 0 && pagina <= Math.ceil(this.docentes.length / this.elementosPorPagina)) {
      this.docentesPaginaActual = pagina;
      this.paginarDocentes();
    }
  }

  siguientePaginaDocentes() {
    if (this.docentesPaginaActual < Math.ceil(this.docentes.length / this.elementosPorPagina)) {
      this.docentesPaginaActual++;
      this.paginarDocentes();
    }
  }

  anteriorPaginaDocentes() {
    if (this.docentesPaginaActual > 1) {
      this.docentesPaginaActual--;
      this.paginarDocentes();
    }
  }

  seleccionarDocente(docente: any) {
    this.docenteSeleccionado = docente;
    this.cursoSeleccionado = null;
    this.editandoDocente = false;
    this.agregandoDocente = false;
    this.cursosPaginaActual = 1; // Reiniciar la página de cursos al seleccionar un docente
    this.paginarCursos();
  }

  paginarCursos() {
    if (this.docenteSeleccionado) {
      const inicio = (this.cursosPaginaActual - 1) * this.elementosPorPagina;
      const fin = inicio + this.elementosPorPagina;
      this.cursosPaginados = this.docenteSeleccionado.cursos.slice(inicio, fin);
    }
  }

  cambiarPaginaCursos(pagina: number) {
    if (pagina > 0 && pagina <= Math.ceil(this.docenteSeleccionado!.cursos.length / this.elementosPorPagina)) {
      this.cursosPaginaActual = pagina;
      this.paginarCursos();
    }
  }

  siguientePaginaCursos() {
    if (this.cursosPaginaActual < Math.ceil(this.docenteSeleccionado!.cursos.length / this.elementosPorPagina)) {
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

  agregarDocente() {
    this.agregandoDocente = true;
    this.docenteSeleccionado = null;
    this.cursoSeleccionado = null;
  }

  guardarNuevoDocente() {
    if (this.nuevoDocenteForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '290px',
        data: {
          title: 'Confirmar creación',
          message: '¿Está seguro que desea crear el nuevo docente?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const nuevoDocente = {
            ...this.nuevoDocenteForm.value,
            id: this.docentes.length + 1,
            status: this.nuevoDocenteForm.value.status ? 'Activo' : 'Inactivo',
            cursos: [],
            password: this.nuevoDocenteForm.value.contraseña
          };

          this.docentesService.addDocente(nuevoDocente).subscribe((docente: any) => {
            this.docentes.push(nuevoDocente);
          console.log(nuevoDocente);
          this.paginarDocentes();
          this.nuevoDocenteForm.reset({ status: false, contraseña: '' });
          this.agregandoDocente = false;
          this.snackBar.open('Docente agregado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['mensage-exito']
          });
          },
          (error: any) => {
            this.snackBar.open('Error al agregar docente ' + error.error.message, 'Cerrar', {
              duration: 10000,
              panelClass: ["mensaje-error"],
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          });
        }
      });
    }
    else {
      this.snackBar.open('Por favor, complete todos los campos correctamente.', 'Cerrar', {
        duration: 3000,
        panelClass: ["mensaje-error"],
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }
  }

  validarDocente(docente: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const identidadRegex = /^\d{4}-\d{4}-\d{5}$/;
    const telefonoRegex = /^\d{8}$/;

    if (docente.nombre.trim().length < 3) {
      this.snackBar.open('El nombre debe tener al menos 3 caracteres', 'Cerrar', { duration: 3000 });
      return false;
    }
    if (docente.apellido.trim() === '') {
      this.snackBar.open('El apellido es obligatorio', 'Cerrar', { duration: 3000 });
      return false;
    }
    if (!emailRegex.test(docente.email)) {
      this.snackBar.open('El email no es válido', 'Cerrar', { duration: 3000 });
      return false;
    }
    if (docente.especialidad.trim() === '') {
      this.snackBar.open('La especialidad es obligatoria', 'Cerrar', { duration: 3000 });
      return false;
    }
    if (!identidadRegex.test(docente.identidad)) {
      this.snackBar.open('La identidad no es válida. Debe tener el formato 0000-0000-00000', 'Cerrar', { duration: 3000 });
      return false;
    }
    if (!telefonoRegex.test(docente.telefono)) {
      this.snackBar.open('El teléfono debe tener 8 dígitos', 'Cerrar', { duration: 3000 });
      return false;
    }
    return true;
  }

  cancelarAgregarDocente() {
    this.nuevoDocente = { nombre: '', apellido: '', email: '', especialidades: '', status: false };
    this.agregandoDocente = false;
  }

  editarDocente() {
    this.editandoDocente = true;
    this.editarDocenteForm.patchValue({
      nombre: this.docenteSeleccionado.nombre,
      apellido: this.docenteSeleccionado.apellido,
      email: this.docenteSeleccionado.email,
      especialidad: this.docenteSeleccionado.especialidad,
      identidad: this.docenteSeleccionado.identidad,
      telefono: this.docenteSeleccionado.telefono,
      direccion: this.docenteSeleccionado.direccion,
      status: this.docenteSeleccionado.status === 'Activo',
      fechaNacimiento: this.docenteSeleccionado.fechaNacimiento
    });
  }

  guardarDocente() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro que desea guardar los cambios?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editarDocenteForm.valid) {
          const updatedDocente = {
            id: this.docenteSeleccionado.id,
            ...this.editarDocenteForm.value,
            status: this.editarDocenteForm.value.status ? 'Activo' : 'Inactivo',
            fechaNacimiento: this.formateador.convertirFechaMySQLaStandarWeb(this.editarDocenteForm.value.fechaNacimiento)[6]
            // fechaNacimiento: this.editarDocenteForm.value.fechaNacimiento
          };
          console.log(updatedDocente);
          this.docentesService.updateDocente(updatedDocente).subscribe((docente: any) => {
            this.snackBar.open('Docente actualizado', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['mensage-exito']
            });
          },
          (error: any) => {
            console.log(error);
            this.snackBar.open('Error al actualizar docente ' + error.error, 'Cerrar', {
              duration: 10000,
              panelClass: ["mensaje-error"],
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          });
          Object.assign(this.docenteSeleccionado, updatedDocente);
          this.editandoDocente = false;
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

  eliminarDocente(docente: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '290px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar el docente?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.docentesService.deleteDocente(docente.id).subscribe(() => {
          this.docentes = this.docentes.filter((d: any) => d.id !== docente.id);
          this.paginarDocentes();
          this.docenteSeleccionado = null;
          this.cursoSeleccionado = null;
          this.snackBar.open('Docente Eliminado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['mensage-exito']
          });
        },
        (error: any) => {
          this.snackBar.open('Error al eliminar docente ' + error.error.message, 'Cerrar', {
            duration: 10000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
      });
      }
    });
  }

  seleccionarCurso(curso: any) {
    this.cursoSeleccionado = curso;
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
