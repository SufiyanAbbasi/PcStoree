// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { Item } from '../interface/item';  // Update the path according to your project structure
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:7250/api/Products'; // Adjust this URL to where your backend API is hosted

  constructor(private http: HttpClient) {}

  getItemsByType(type: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/${type}`);
  }

  getItemById(type: string, id: number): Observable<Item> {
    //https://localhost:7250/api/Products/6
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

}
