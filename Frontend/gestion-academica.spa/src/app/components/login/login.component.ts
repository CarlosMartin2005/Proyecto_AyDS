import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('email') emailInput: ElementRef | undefined;
  @ViewChild('password') passwordInput: ElementRef | undefined;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  login() {
    const email = this.emailInput?.nativeElement.value;
    const password = this.passwordInput?.nativeElement.value;

    if (!this.validateEmail(email)) {
      this.errorMessage = 'Correo no válido';
      return;
    }

    if (!password) {
      this.errorMessage = 'Contraseña no puede estar vacía';
      return;
    }

    this.authService.login(email, password).subscribe(
      (response: any) => {
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['mensage-exito']
        });
        this.successMessage = 'Inicio de sesión exitoso';
        console.log(response.data);
        if (response.data.status === 'I') {
          this.router.navigate(['/cuenta']);
          return;
        }
        else {
          if(response.data.rol === 'Alumno') {
            this.router.navigate(['/campus-estudiantes/inicio']);
            return;
          }
          if(response.data.rol === 'Docente') {
            this.router.navigate(['/campus-docentes/inicio']);
            return;
          }
          else {
            this.router.navigate(['/campus/inicio']);
            return;
          }
        }
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Cerrar', {
          duration: 10000,
          panelClass: ["mensaje-error"],
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        this.errorMessage = 'Error al iniciar sesión';
        console.error('Error al iniciar sesión', error);
      }
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = null;
    this.successMessage = null;
    this.login();
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
