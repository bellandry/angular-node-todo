import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
        .subscribe({
          next: (response) => {
            this.setToken(response.token);
            this.getUserInfo().subscribe({
              next: () => observer.next(response),
              error: (error) => observer.error(error),
            });
          },
          error: (error) => observer.error(error),
        });
    });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  }

  getUserInfo(): Observable<User> {
    return new Observable((observer) => {
      this.http.get<User>(`${this.apiUrl}/me`).subscribe({
        next: (user) => {
          this.currentUser = user;
          observer.next(user);
          observer.complete();
        },
        error: (error) => {
          this.logout();
          observer.error(error);
        },
      });
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
