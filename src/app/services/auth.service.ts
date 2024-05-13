import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7250/api/Users'; // Your backend API base URL
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public loggedInUser: Observable<any> = this.loggedInUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(user => {
        // Store the logged-in user's information in a BehaviorSubject
        this.loggedInUserSubject.next(user);
      })
    );
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  logout(): void {
    console.log("user logout");
    
    // Clear the logged-in user's information
    this.loggedInUserSubject.next(null);
  }
}
