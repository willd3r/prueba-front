import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  confirmarContraseña: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: any;
  token?: string;
}

export interface VerificationRequest {
  email: string;
}

export interface VerificationResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // Método para solicitar registro (envía código de verificación)
  requestRegistration(email: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/register_request`, { email });
  }

  // Método para registrar un nuevo usuario (con código de verificación)
  registerWithCode(userData: RegisterRequest, code: string): Observable<RegisterResponse> {
    const registrationData = {
      primary_data: {
        name: userData.nombre,
        last_name: userData.apellido,
        phone: '', // Campo requerido pero no en el formulario
        email: userData.email,
        nickname: userData.nombre.toLowerCase(), // Usar nombre como nickname
        type: 'user', // Tipo por defecto
        description: 'Usuario registrado desde el frontend'
      },
      auth_data: {
        password: userData.contraseña
      },
      email: userData.email, // Agregar email al mismo nivel que el código
      code: code // Código de verificación
    };

    return this.http.post<RegisterResponse>(`${this.apiUrl}/register_user`, registrationData);
  }

  // Método para verificar si el email ya existe
  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-email?email=${email}`);
  }

  // Método para enviar código de verificación
  sendVerificationCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register_request`, { email });
  }

  // Método para verificar código
  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-code`, { email, code });
  }

  // Método para iniciar el proceso de registro (envía código de verificación)
  register(userData: RegisterRequest): Observable<VerificationResponse> {
    // Primero enviamos el código de verificación
    return this.requestRegistration(userData.email);
  }
} 