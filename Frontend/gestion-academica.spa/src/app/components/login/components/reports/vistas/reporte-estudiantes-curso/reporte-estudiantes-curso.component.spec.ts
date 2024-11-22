import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstudiantesCursoComponent } from './reporte-estudiantes-curso.component';

describe('ReporteEstudiantesCursoComponent', () => {
  let component: ReporteEstudiantesCursoComponent;
  let fixture: ComponentFixture<ReporteEstudiantesCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteEstudiantesCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteEstudiantesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
