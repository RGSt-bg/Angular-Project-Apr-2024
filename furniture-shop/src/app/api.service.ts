import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Category } from './types/category';
import { Furniture } from './types/furniture';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCategories() {
    const { apiUrl } = environment;

    return this.http.get<any>(`${apiUrl}/furniture/categories`);
  }

  getFurnitureByCategory(category: string) {
    const { apiUrl } = environment;
    return this.http.get<Furniture[]>(`${apiUrl}/furniture/furnitureList?calledFrom=category&category=${category}`);
  }

  getLatestFurnitures() {
    const { apiUrl } = environment;
    return this.http.get<Furniture[]>(`${apiUrl}/furniture/furnitureList?calledFrom=newProducts`);
  }

  createCategory(category: string, imageCategory: string) {
    const { apiUrl } = environment;
    const payload = { category, imageCategory };
    return this.http.post<Category>(`${apiUrl}/furniture/createCategory`, payload);
  }

  createFurniture(name: string, category: string, imageFurniture: string, color: string, material: string, price: number, description: string) {
    const { apiUrl } = environment;

    // if (!name || !category || !imageFurniture || !color || !material || !price || !description) {
    //   return;
    // }
    const payload = { name, category, imageFurniture, color, material, price, description };
    return this.http.post<Furniture>(`${apiUrl}/furniture/createFurniture`, payload);
  }

  getFurnitureDetails(furnitureId: string) {
    const { apiUrl } = environment;

    return this.http.get<Furniture>(`${apiUrl}/furniture/details/${furnitureId}`);
  }

  searchFurnitures(searchString: string) {
    const { apiUrl } = environment;
    return this.http.get<Furniture[]>(`${apiUrl}/furniture/search?calledFrom=search&searchString=${searchString}`);
  }

  deleteFurniture(furnitureId: string) {
    const { apiUrl } = environment;
    return this.http.get<Furniture>(`${apiUrl}/furniture/delete/${furnitureId}`);
  }
  
}
