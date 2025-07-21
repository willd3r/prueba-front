import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Dedicated {
  _id?: string;
  name: string;
  description: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class DedicatedService {
  private apiUrl = `${environment.apiUrl}/dedicated`;

  constructor(private http: HttpClient) {}

  // ranking
  getDedicatedRanking(): Observable<Dedicated[]> {
    return this.http.get<Dedicated[]>(`${this.apiUrl}`);
  }

  getAllDedicated(): Observable<Dedicated[]> {
    return this.http.get<Dedicated[]>(this.apiUrl);
  }

  getDedicatedById(id: string): Observable<Dedicated> {
    return this.http.get<Dedicated>(`${this.apiUrl}/${id}`);
  }

  createDedicated(data: Dedicated): Observable<Dedicated> {
    return this.http.post<Dedicated>(this.apiUrl, data);
  }

  updateDedicated(id: string, data: Partial<Dedicated>): Observable<Dedicated> {
    return this.http.put<Dedicated>(`${this.apiUrl}/${id}`, data);
  }

  deleteDedicated(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
