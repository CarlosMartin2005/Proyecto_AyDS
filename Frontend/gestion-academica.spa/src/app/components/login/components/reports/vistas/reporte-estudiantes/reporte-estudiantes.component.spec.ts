import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstudiantesComponent } from './reporte-estudiantes.component';

describe('ReporteEstudiantesComponent', () => {
  let component: ReporteEstudiantesComponent;
  let fixture: ComponentFixture<ReporteEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteEstudiantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
