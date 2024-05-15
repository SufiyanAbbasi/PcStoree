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

  constructor(private http: HttpClient) {
     // Initialize the user from local storage on service creation
     const storedUsername = localStorage.getItem('username');
     if (storedUsername) {
       this.loggedInUserSubject.next({ name: storedUsername });
     }
   }

  // login(credentials: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
  //     tap(user => {
  //       // Store the logged-in user's information in a BehaviorSubject
  //       this.loggedInUserSubject.next(user);
  //       localStorage.setItem('username', user.name);
  //     })
  //   );
  // }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(user => {
        // Store user data in local storage or a suitable place
        localStorage.setItem('user', JSON.stringify(user));
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
    localStorage.removeItem('username');
  }

  getUserId(): number | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;  // Make sure the 'id' matches the key in your user object
  }
  
}
