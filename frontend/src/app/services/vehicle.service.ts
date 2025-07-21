import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicle`;


  constructor(private http: HttpClient) {}

 getVehicles(filters: { [key: string]: any } = {}): Observable<any[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });
    return this.http.get<any[]>(`${this.apiUrl}/vehicles`, { params });
  }

  getVehicleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vehicles/${id}`);
  }

  createVehicle(vehicle: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vehicles`, vehicle);
  }

  updateVehicle(id: string, vehicle: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/vehicles/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/vehicles/${id}`);
  }

 getVehicles1(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/api/vehicle/vehicles');
}

}
