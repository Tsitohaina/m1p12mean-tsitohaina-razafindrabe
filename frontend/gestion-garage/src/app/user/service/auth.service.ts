import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${API_CONFIG.baseUrl}user`;
  constructor(private http: HttpClient) {}
  
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('authToken');
      return token ? true : false; 
    }
    return false;
  }
  login(mail: string,password: string): Observable<any> {
    const data = {mail:mail, password:password};
    return this.http.post(`${this.apiUrl}/login`, data);

  }
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, userData);
  }
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
