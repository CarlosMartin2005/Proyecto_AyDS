import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExcelenciaComponent } from './reporte-excelencia.component';

describe('ReporteExcelenciaComponent', () => {
  let component: ReporteExcelenciaComponent;
  let fixture: ComponentFixture<ReporteExcelenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteExcelenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteExcelenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
