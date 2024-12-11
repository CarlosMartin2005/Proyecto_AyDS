import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosImpartidosComponent } from './cursos-impartidos.component';

describe('CursosImpartidosComponent', () => {
  let component: CursosImpartidosComponent;
  let fixture: ComponentFixture<CursosImpartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosImpartidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursosImpartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
