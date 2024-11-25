import { TestBed } from '@angular/core/testing';

import { ReporteAlumnoPorCyPService } from './reporte-alumno-por-cy-p.service';

describe('ReporteAlumnoPorCyPService', () => {
  let service: ReporteAlumnoPorCyPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteAlumnoPorCyPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
