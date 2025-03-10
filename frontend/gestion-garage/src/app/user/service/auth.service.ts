import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return token != null;
  }
  login(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
