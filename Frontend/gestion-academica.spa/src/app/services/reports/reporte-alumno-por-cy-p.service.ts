import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReporteAlumnoPorCyPService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient)
  { }

  getInfo(){
    return this.http.get(`${this.apiUrl}/reportes/estudiantes-cursos`)
  }
}
