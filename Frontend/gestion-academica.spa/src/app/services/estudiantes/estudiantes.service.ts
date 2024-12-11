import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getEstudiantes(searchQuery?: string) {
    let url = `${this.apiUrl}/reportes/estudiantes`;
    if (searchQuery) {
      url += `?search=${searchQuery}`;
    }
    return this.http.get(url);
  }

  getEstudiantesInfo() {
    return this.http.get(`${this.apiUrl}/estudiantes`)
  }

  updateEstudiante(data: any) {
    return this.http.post(`${this.apiUrl}/estudiantes/edit-estudiante`, data);
  }

  updateMatricula(data: any) {
    return this.http.post(`${this.apiUrl}/estudiantes/edit-matricula`, data);
  }

  deleteDocente(data: any) {
    const body = { ['id']: data }
    return this.http.delete(`${this.apiUrl}/estudiantes/delete-estudiante`, { body })
  }
}
