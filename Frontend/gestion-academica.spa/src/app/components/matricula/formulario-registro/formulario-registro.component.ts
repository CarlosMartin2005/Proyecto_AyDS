import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatriculaService } from '../../../services/matricula/matricula.service';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent {

  programaSeleccionado: string | null = null;
  programaPrincipalSeleccionado: string | null = null;
  registroForm: FormGroup;
  cursosSeleccionados: any[] = [];

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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private matriculaService: MatriculaService) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      identidad: ['', [Validators.required, Validators.pattern(/^[0-1][0-8][0-9]{2}-[0-9]{4}-[0-9]{5}$/)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator]],
      lugarNacimiento: [''],
      direccion: [''],
      institucionProcedencia: [''],
      instrumento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue],
      horario: ['', Validators.required],
      // cursos: [[], Validators.required]
    }, { validator: this.passwordMatchValidator });

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

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  fechaNacimientoValidator(control: any) {
    const fechaNacimiento = new Date(control.value);
    const fechaActual = new Date();
    const edadMinima = 4;
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    return edad >= edadMinima ? null : { edadInvalida: true };
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      const selectedProgramas = this.programas
        .filter(programa => programa.seleccionado)
        .map(programa => ({
          id: programa.id,
          nombre: programa.nombre,
          descripcion: programa.descripcion,
          cursos: programa.cursos.filter(curso => curso.seleccionado)
        }));

      // Validar que al menos un curso esté seleccionado por cada programa principal
      const programasPrincipales = selectedProgramas.filter(p => p.nombre !== 'Cursos libres');
      const programasInvalidos = programasPrincipales.filter(p => p.cursos.length === 0);

      if (programasInvalidos.length > 0) {
        programasInvalidos.forEach(programa => {
          this.snackBar.open(`Debe seleccionar al menos un curso para el programa ${programa.nombre}`, 'Cerrar', {
            duration: 10000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        });
        return;
      }

      // Validar que si se selecciona "Cursos libres", al menos un curso esté matriculado
      const cursosLibres = selectedProgramas.find(p => p.nombre === 'Cursos libres');
      if (cursosLibres && cursosLibres.cursos.length === 0) {
        this.snackBar.open('Debe seleccionar al menos un curso para el programa Cursos libres', 'Cerrar', {
          duration: 10000,
          panelClass: ["mensaje-error"],
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      formData.programas = selectedProgramas;
      this.matriculaService.registerAlumno(formData).subscribe(
        (data: any) => {
          this.router.navigate(['matricula/registro-exitoso']);
          console.log('Registro exitoso:', data);

          this.snackBar.open('Registro exitoso', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['mensage-exito']
      });
        },
        (error: any) => {
          this.snackBar.open('Error en el servicio de matrícula: ' + error.error.message, 'Cerrar', {
            duration: 10000,
            panelClass: ["mensaje-error"],
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
          console.error('Error en el servicio de matrícula:', error);
        }
      );
    } else {
      this.markAllAsTouched();
      this.snackBar.open('Formulario no válido. Por favor, revise los campos.', 'Cerrar', {
        duration: 10000,
        panelClass: ["mensaje-error"],
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      console.log('Formulario no válido');
    }
  }

  markAllAsTouched() {
    Object.keys(this.registroForm.controls).forEach(field => {
      const control = this.registroForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  togglePasswordVisibility(id: string): void {
    const passwordInput = document.getElementById(id) as HTMLInputElement;
    const passwordEye = document.getElementById(id + '-eye') as HTMLElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordEye.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
    } else {
      passwordInput.type = 'password';
      passwordEye.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
    }
  }

  seleccionarPrograma(programa: string): void {
    if (programa === 'Cursos libres') {
      this.programaSeleccionado = this.programaSeleccionado === programa ? null : programa;
    } else {
      if (this.programaPrincipalSeleccionado === programa) {
        this.programaPrincipalSeleccionado = null;
      } else {
        this.programaPrincipalSeleccionado = programa;
        this.programas.forEach(p => {
          if (p.nombre !== programa && p.nombre !== 'Cursos libres') {
            p.seleccionado = false;
          }
        });
      }
    }
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

  getSelectedProgramas() {
    return this.programas.filter(programa => programa.seleccionado);
  }

  onHorarioChange() {
    const horario = this.registroForm.get('horario')?.value;
    const programa = this.programas.find(p => p.nombre === horario);
    this.cursosSeleccionados = programa ? programa.cursos : [];
  }

  toggleSeleccionarCurso(curso: any): void {
    curso.seleccionado = !curso.seleccionado;
    const cursosControl = this.registroForm.get('cursos');
    if (curso.seleccionado) {
      cursosControl?.setValue([...cursosControl.value, curso.nombre]);
    } else {
      cursosControl?.setValue(cursosControl.value.filter((nombre: string) => nombre !== curso.nombre));
    }
  }
}
