import { Component } from '@angular/core';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { ReportMatriculaComponent } from './report-matricula/report-matricula.component';

@Component({
  selector: 'app-reporte-matricula',
  standalone: true,
  imports: [ ButtonGoBackComponent, ReportMatriculaComponent ],
  templateUrl: './reporte-matricula.component.html',
  styleUrl: './reporte-matricula.component.scss'
})
export class ReporteMatriculaComponent {

}
