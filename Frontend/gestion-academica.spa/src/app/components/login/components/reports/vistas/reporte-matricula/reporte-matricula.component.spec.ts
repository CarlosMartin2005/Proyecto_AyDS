import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMatriculaComponent } from './reporte-matricula.component';

describe('ReporteMatriculaComponent', () => {
  let component: ReporteMatriculaComponent;
  let fixture: ComponentFixture<ReporteMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteMatriculaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
