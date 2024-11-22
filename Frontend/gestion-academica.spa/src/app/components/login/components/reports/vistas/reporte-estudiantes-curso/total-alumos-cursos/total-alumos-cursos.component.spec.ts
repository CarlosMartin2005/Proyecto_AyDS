import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAlumosCursosComponent } from './total-alumos-cursos.component';

describe('TotalAlumosCursosComponent', () => {
  let component: TotalAlumosCursosComponent;
  let fixture: ComponentFixture<TotalAlumosCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalAlumosCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalAlumosCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
