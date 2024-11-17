import { Component } from '@angular/core';
import { TotalAlumnosProgramasComponent } from '../../../total-alumos-programas/total-alumos-programas.component';
import { ReportMatriculaComponent } from '../../../report-matricula/report-matricula.component';

@Component({
  selector: 'app-report-06',
  standalone: true,
  imports: [TotalAlumnosProgramasComponent,ReportMatriculaComponent],
  templateUrl: './report-06.component.html',
  styleUrl: './report-06.component.scss'
})
export class Report06Component {

}
