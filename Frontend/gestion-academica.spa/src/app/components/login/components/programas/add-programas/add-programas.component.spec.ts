import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramasComponent } from './add-programas.component';

describe('AddProgramasComponent', () => {
  let component: AddProgramasComponent;
  let fixture: ComponentFixture<AddProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProgramasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
