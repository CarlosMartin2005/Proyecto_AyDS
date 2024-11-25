import { TestBed } from '@angular/core/testing';

import { FormateadorService } from './formateador.service';

describe('FormateadorService', () => {
  let service: FormateadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormateadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
