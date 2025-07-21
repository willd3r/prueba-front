import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/productType`;
  private rankingUrl = `${environment.apiUrl}/ranking`;

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Agregar un producto
  addProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, productData);
  }

  // Obtener rankings
  getRankings(): Observable<any> {
    return this.http.get(`${this.rankingUrl}/`);
  }

  // Crear un ranking
  createRanking(name: string, score: number): Observable<any> {
    return this.http.post(`${this.rankingUrl}/`, { name, score });
  }
}
