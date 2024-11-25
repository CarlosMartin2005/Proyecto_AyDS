import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteRendimientoService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient)
  { }

  getInfo(id_usuario: string | number){
    return this.http.get(`${this.apiUrl}/reportes/rendimiento-estudiante/${id_usuario}`)
  }
}
