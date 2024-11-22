import { Component } from '@angular/core';
import { ButtonGoBackComponent } from '../button-go-back/button-go-back.component';
import { RendimientoDelEstudianteComponent } from './rendimiento-del-estudiante/rendimiento-del-estudiante.component';

@Component({
  selector: 'app-reporte-rendimiento-estudiante',
  standalone: true,
  imports: [ ButtonGoBackComponent, RendimientoDelEstudianteComponent ],
  templateUrl: './reporte-rendimiento-estudiante.component.html',
  styleUrl: './reporte-rendimiento-estudiante.component.scss'
})
export class ReporteRendimientoEstudianteComponent {

}
