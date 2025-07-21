import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  contraseña: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) { 
    console.log('🔧 LoginService - Constructor inicializado');
    console.log('🔧 LoginService - environment.apiUrl:', environment.apiUrl);
    console.log('🔧 LoginService - apiUrl completo:', this.apiUrl);
  }

  // Método para hacer login
  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('🔧 LoginService - Método login llamado');
    console.log('🔧 LoginService - Credenciales recibidas:', credentials);
    console.log('🔧 LoginService - URL de la petición:', this.apiUrl);
    
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }

  // Método para verificar si el token es válido
  verifyToken(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/verify-token`);
  }

  // Método para obtener información del usuario actual
  getCurrentUserInfo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/profile`);
  }
} 