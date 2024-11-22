import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProgramasCursosComponent } from './reporte-programas-cursos.component';

describe('ReporteProgramasCursosComponent', () => {
  let component: ReporteProgramasCursosComponent;
  let fixture: ComponentFixture<ReporteProgramasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteProgramasCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteProgramasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
