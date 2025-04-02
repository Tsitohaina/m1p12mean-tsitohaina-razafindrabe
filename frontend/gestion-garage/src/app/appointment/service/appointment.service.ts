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

  findById(userId:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/findByUserId/${userId}`);
  }

  findByMechanicId(userId:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/findByMechanicId/${userId}`);
  }

  updateAppointment(id:string,status:string): Observable<any> {
    const data = {status:status};
    return this.http.put(`${this.apiUrl}/updateStatus/${id}`, data);
  }

  updateAppointmentMechnic(id:string,event:any): Observable<any> {
    console.log(event);
    const data = {mechanic:event};
    return this.http.put(`${this.apiUrl}/updateMechanic/${id}`, data);
  }
  findByStatus(status:string): Observable<any>{
    const encodedStatus= encodeURIComponent(status);
    return this.http.get(`${this.apiUrl}/findByStatus/${encodedStatus}`);
  }

}
