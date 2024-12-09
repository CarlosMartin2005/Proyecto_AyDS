import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient)
  { }

  getDocentes(){
    return this.http.get(`${this.apiUrl}/docentes`)
  }

  addDocente(data: any){
    return this.http.post(`${this.apiUrl}/docentes/add-docente`, data)
  }

  updateDocente(data: any){
    return this.http.post(`${this.apiUrl}/docentes/edit-docente`, data)
  }

  deleteDocente(data: any){
    const body = { ['id']: data }
    return this.http.delete(`${this.apiUrl}/docentes/delete-docente`, {body})
  }
}
