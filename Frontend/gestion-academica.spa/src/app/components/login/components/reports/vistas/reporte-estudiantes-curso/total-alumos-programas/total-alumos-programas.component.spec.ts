import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAlumosProgramasComponent } from './total-alumos-programas.component';

describe('TotalAlumosProgramasComponent', () => {
  let component: TotalAlumosProgramasComponent;
  let fixture: ComponentFixture<TotalAlumosProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalAlumosProgramasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalAlumosProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
