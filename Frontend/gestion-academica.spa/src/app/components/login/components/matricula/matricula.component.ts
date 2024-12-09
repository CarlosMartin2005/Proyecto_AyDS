import { Component } from '@angular/core';
import { ReportMatriculaComponent } from './reporte-matricula/report-matricula/report-matricula.component';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [ReportMatriculaComponent],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.scss'
})
export class MatriculaComponent {

}
