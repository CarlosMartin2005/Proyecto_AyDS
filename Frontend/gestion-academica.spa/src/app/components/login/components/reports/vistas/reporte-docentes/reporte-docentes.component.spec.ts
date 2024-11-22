import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDocentesComponent } from './reporte-docentes.component';

describe('ReporteDocentesComponent', () => {
  let component: ReporteDocentesComponent;
  let fixture: ComponentFixture<ReporteDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteDocentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
