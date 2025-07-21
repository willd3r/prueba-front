import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Professional {
  description: any;
  _id?: string;
  name: string;
  profession: string;
  experience: number;
  score: number;
  categorie?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private apiUrl = `${environment.apiUrl}/professional`;

  constructor(private http: HttpClient) {}

  // Crear un profesional
  createProfessional(data: Professional): Observable<Professional> {
    return this.http.post<Professional>(this.apiUrl, data);
  }

  // Obtener todos los profesionales con ranking
  getAllProfessionals(): Observable<Professional[]> {
    return this.http.get<Professional[]>(this.apiUrl);
  }

  // Obtener un profesional por ID
  getProfessionalById(id: string): Observable<Professional> {
    return this.http.get<Professional>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un profesional
  updateProfessional(id: string, data: Partial<Professional>): Observable<Professional> {
    return this.http.put<Professional>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar un profesional
  deleteProfessional(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Obtener profesionales por categoría
  getProfessionalsByCategory(categorie: string): Observable<Professional[]> {
    return this.http.get<Professional[]>(`${this.apiUrl}/category/${categorie}`);
  }
}
