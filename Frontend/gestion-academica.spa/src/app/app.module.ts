import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule, // Agregar FormsModule aquí
    AppComponent // Importar el componente independiente
  ],
  providers: [],
  // bootstrap: [AppComponent] // Asegúrate de que el componente se use en bootstrap
})
export class AppModule { }
