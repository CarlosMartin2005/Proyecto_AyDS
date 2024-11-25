import { TestBed } from '@angular/core/testing';

import { ReporteRendimientoService } from './reporte-rendimiento.service';

describe('ReporteRendimientoService', () => {
  let service: ReporteRendimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteRendimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
