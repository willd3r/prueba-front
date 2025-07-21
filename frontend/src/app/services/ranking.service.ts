import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private apiUrl = `${environment.apiUrl}/ranking`;

  constructor(private http: HttpClient) {}

  getRankings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRanking(name: string, score: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, score });
  }
}
