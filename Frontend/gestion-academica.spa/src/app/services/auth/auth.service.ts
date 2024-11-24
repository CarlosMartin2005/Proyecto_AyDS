import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  login( email: string, password: string ) {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap( (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('rol', response.data.rol);
        localStorage.setItem('status', response.data.status);
      })
    );

  }
}
