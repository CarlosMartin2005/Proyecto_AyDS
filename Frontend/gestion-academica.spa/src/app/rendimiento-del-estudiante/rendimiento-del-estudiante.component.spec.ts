import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendimientoDelEstudianteComponent } from './rendimiento-del-estudiante.component';

describe('RendimientoDelEstudianteComponent', () => {
  let component: RendimientoDelEstudianteComponent;
  let fixture: ComponentFixture<RendimientoDelEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendimientoDelEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendimientoDelEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
