import { Component } from '@angular/core';
import { ReportMatriculaComponent } from './report-matricula/report-matricula.component';

@Component({
  selector: 'app-reporte-matricula',
  standalone: true,
  imports: [ReportMatriculaComponent],
  templateUrl: './reporte-matricula.component.html',
  styleUrl: './reporte-matricula.component.scss'
})
export class ReporteMatriculaComponent {

}
