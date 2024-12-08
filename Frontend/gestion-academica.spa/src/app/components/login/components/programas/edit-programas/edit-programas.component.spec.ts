import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramasComponent } from './edit-programas.component';

describe('EditProgramasComponent', () => {
  let component: EditProgramasComponent;
  let fixture: ComponentFixture<EditProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProgramasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
