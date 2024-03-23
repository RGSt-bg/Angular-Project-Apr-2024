import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Category } from './types/category';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCategories() {
    const { apiUrl } = environment;

    return this.http.get<any>(`${apiUrl}/furniture/categories`);
  }

  createCategory(category: string, imageCategory: string) {
    const { apiUrl } = environment;
    const payload = { category, imageCategory };
console.log('payload: ', payload);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Category>(`${apiUrl}/furniture/createCategory`, payload, { headers });
    // return this.http.post<Category>(`${apiUrl}/furniture/createCategory`, payload);
  }
}
