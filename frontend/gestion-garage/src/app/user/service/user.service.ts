import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${API_CONFIG.baseUrl}user`;
  constructor(private http: HttpClient) { }

  findUserByRole(role:string): Observable<any>{
    const encodedUserId = encodeURIComponent(role);
    return this.http.get(`${this.apiUrl}/findUserByRole/${encodedUserId}`);
  }
}
