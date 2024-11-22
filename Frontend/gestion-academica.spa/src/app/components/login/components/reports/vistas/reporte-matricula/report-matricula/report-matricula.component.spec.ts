import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMatriculaComponent } from './report-matricula.component';

describe('ReportMatriculaComponent', () => {
  let component: ReportMatriculaComponent;
  let fixture: ComponentFixture<ReportMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportMatriculaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
