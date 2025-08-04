// filepath: c:\Users\Urano\Documents\Test-Lv\FRONT\src\app\lives\components\main\live.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStreamUrl(): Observable<{ streamingUrl: string }> {
    // Ajusta el endpoint si es necesario
    return this.http.post<{ streamingUrl: string }>('http://localhost:3000/api/stream/create-stream', {});
  }
}
