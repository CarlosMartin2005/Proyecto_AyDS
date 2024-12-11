import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaInactivaComponent } from './cuenta-inactiva.component';

describe('CuentaInactivaComponent', () => {
  let component: CuentaInactivaComponent;
  let fixture: ComponentFixture<CuentaInactivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaInactivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaInactivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
