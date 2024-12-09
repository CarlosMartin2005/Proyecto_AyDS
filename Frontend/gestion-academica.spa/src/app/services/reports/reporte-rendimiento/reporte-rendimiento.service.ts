import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteRendimientoService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getInfo(id_usuario: string | number, startDate?: Date, endDate?: Date) {
    let params = new HttpParams();
    if (startDate && endDate) {
      params = params.set('startDate', startDate.toISOString()).set('endDate', endDate.toISOString());
    }
    return this.http.get(`${this.apiUrl}/reportes/rendimiento-estudiante/${id_usuario}`, { params });
  }
}