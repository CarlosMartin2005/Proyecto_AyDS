import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSeguimientoComponent } from './reporte-seguimiento.component';

describe('ReporteSeguimientoComponent', () => {
  let component: ReporteSeguimientoComponent;
  let fixture: ComponentFixture<ReporteSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteSeguimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
