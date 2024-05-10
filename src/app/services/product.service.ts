// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Item } from '../interface/item';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = 'https://localhost:7250/api/Products?category=laptop';
//   constructor(private http: HttpClient) { }

//   getProductsByCategory(category: string): Observable<Item[]> {
//     return this.http.get<Item[]>(`${this.apiUrl}/Products?category=${encodeURIComponent(category)}`);
//   }
// }
