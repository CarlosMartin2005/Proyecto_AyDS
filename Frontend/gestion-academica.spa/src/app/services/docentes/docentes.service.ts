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
}
