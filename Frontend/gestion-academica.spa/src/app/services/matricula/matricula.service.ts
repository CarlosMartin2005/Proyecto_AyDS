import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient)
  { }

  getProgramas(){
    return this.http.get(`${this.apiUrl}/matricula/programas`)
  }

  registerAlumno(data: any){
    return this.http.post(`${this.apiUrl}/matricula/register`, data)
  }
}
