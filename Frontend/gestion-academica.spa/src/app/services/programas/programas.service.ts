import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient)
  { }

  getProgramas(){
    return this.http.get(`${this.apiUrl}/programas`)
  }

  addProgramas(data: any){
    return this.http.post(`${this.apiUrl}/programas/add-programa`, data)
  }

  addCursos(data: any){
    return this.http.post(`${this.apiUrl}/programas/add-curso`, data)
  }

  editProgramas(data: any){
    return this.http.post(`${this.apiUrl}/programas/edit-programa`, data)
  }

  editCursos(data: any){
    return this.http.post(`${this.apiUrl}/programas/edit-curso`, data)
  }

  deleteProgramas(data: any){
    const body = { ['id']: data }
    return this.http.delete(`${this.apiUrl}/programas/delete-programa`, {body})
  }

  deleteCursos(data: any){
    const body = { ['id']: data }
    return this.http.delete(`${this.apiUrl}/programas/delete-curso`, {body})
  }
}
