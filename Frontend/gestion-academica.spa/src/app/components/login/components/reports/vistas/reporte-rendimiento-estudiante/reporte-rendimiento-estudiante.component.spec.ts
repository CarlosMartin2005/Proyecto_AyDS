import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRendimientoEstudianteComponent } from './reporte-rendimiento-estudiante.component';

describe('ReporteRendimientoEstudianteComponent', () => {
  let component: ReporteRendimientoEstudianteComponent;
  let fixture: ComponentFixture<ReporteRendimientoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteRendimientoEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteRendimientoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
