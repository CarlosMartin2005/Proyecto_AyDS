import { Component } from '@angular/core';
import { TotalAlumnosCursosComponent } from './total-alumos-cursos/total-alumos-cursos.component';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
@Component({
  selector: 'app-reporte-estudiantes-curso',
  standalone: true,
  imports: [ TotalAlumnosCursosComponent, ButtonGoBackComponent ],
  templateUrl: './reporte-estudiantes-curso.component.html',
  styleUrl: './reporte-estudiantes-curso.component.scss'
})
export class ReporteEstudiantesCursoComponent {

}
