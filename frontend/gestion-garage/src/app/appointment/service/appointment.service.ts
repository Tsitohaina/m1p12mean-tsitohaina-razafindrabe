import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../api.config';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = `${API_CONFIG.baseUrl}appointment`;
  constructor(private http: HttpClient) { }

  createAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, appointment);
  }

  findById(userId:string){
    return this.http.get(`${this.apiUrl}/findByUserId/${userId}`);
  }
}
