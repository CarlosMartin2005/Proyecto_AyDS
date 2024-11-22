import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAprobadoReprobadoComponent } from './report-aprobado-reprobado.component';

describe('ReportAprobadoReprobadoComponent', () => {
  let component: ReportAprobadoReprobadoComponent;
  let fixture: ComponentFixture<ReportAprobadoReprobadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportAprobadoReprobadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportAprobadoReprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
