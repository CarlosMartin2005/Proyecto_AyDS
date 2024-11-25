import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
// import { OtroComponenteModule } from './otros/otro-componente/otro-componente.module'; // Importar el módulo
// import { SearchBarComponentModule } from './otros/search-bar/search-bar.module'; // Importar el módulo

@NgModule({
  declarations: [
    // AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule, // Agregar FormsModule aquí
    // SearchBarComponentModule // Importar el módulo aquí
  ],
  providers: [],
  // bootstrap: [AppComponent] // Asegúrate de que el componente se use en bootstrap
})
export class AppModule { }
