import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PersonalInfo {
  name: string;
  lastName: string;
  dni: string;
  email: string;
  areaCode: string;
  phone: string;
  location: string;
  birthDate: string;
  receiveNews: boolean;
}

export interface VehicleInfo {
  type: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  kilometers: number;
  blueCard?: File;
  images?: File[];
  receiveNews: boolean;
}

export interface ProfileInfo {
  username: string;
  accountName: string;
  description: string;
  profileImage?: File;
}

export interface AccountInfo {
  email: string;
  phone: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Guardar información personal (para delivery)
  savePersonalInfo(data: PersonalInfo): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/personal-info`, data);
  }

  // Guardar información del vehículo (para delivery)
  saveVehicleInfo(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles/vehicles`, data);
  }

  // Guardar información del perfil (para emprendedores)
  saveProfileInfo(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/profile/update`, data);
  }

  // Actualizar información de cuenta (teléfono y contraseña)
  updateAccountInfo(data: AccountInfo): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/account-info`, data);
  }

  // Cambiar contraseña
  changePassword(password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/change_password`, { password });
  }

  // Actualizar rol del usuario
  updateUserRole(role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/update-role`, { role });
  }

  // Obtener información del perfil del usuario actual
  getCurrentUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`);
  }
} 