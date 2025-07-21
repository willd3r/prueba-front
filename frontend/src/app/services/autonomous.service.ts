import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Autonomous {
  _id?: string;
  name: string;
  description: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class AutonomousService {
  private apiUrl = `${environment.apiUrl}/autonomous`;

  constructor(private http: HttpClient) {}

  // ranking
  getAutonomousRanking(): Observable<Autonomous[]> {
    return this.http.get<Autonomous[]>(`${this.apiUrl}`);
  }


  getAllAutonomous(): Observable<Autonomous[]> {
    return this.http.get<Autonomous[]>(this.apiUrl);
  }


  getAutonomousById(id: string): Observable<Autonomous> {
    return this.http.get<Autonomous>(`${this.apiUrl}/${id}`);
  }


  createAutonomous(data: Autonomous): Observable<Autonomous> {
    return this.http.post<Autonomous>(this.apiUrl, data);
  }


  updateAutonomous(id: string, data: Partial<Autonomous>): Observable<Autonomous> {
    return this.http.put<Autonomous>(`${this.apiUrl}/${id}`, data);
  }


  deleteAutonomous(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
