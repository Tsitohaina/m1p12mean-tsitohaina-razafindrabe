import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { IUser } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${API_CONFIG.baseUrl}user`;
  user: IUser | null = null;
  constructor(private http: HttpClient,private router: Router) {}
  
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
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
    localStorage.removeItem('user');
  }
  redirectionUserRole(user:IUser){
    console.log(user.role);
    if(user.role == "client") this.router.navigate(['/customer/appointment']);
    else if(user.role == "mécanicien") this.router.navigate(['/mechanic/appointment']);
    else if(user.role == "manager") this.router.navigate(['/manager/appointment']);
  }

}
