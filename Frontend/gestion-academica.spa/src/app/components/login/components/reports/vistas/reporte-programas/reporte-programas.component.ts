import { Component } from '@angular/core';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { ReportAprobadoReprobadoComponent } from './report-aprobado-reprobado/report-aprobado-reprobado.component';

@Component({
  selector: 'app-reporte-programas',
  standalone: true,
  imports: [ ButtonGoBackComponent, ReportAprobadoReprobadoComponent ],
  templateUrl: './reporte-programas.component.html',
  styleUrl: './reporte-programas.component.scss'
})
export class ReporteProgramasComponent {

}
