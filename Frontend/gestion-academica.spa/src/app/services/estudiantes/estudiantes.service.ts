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
}