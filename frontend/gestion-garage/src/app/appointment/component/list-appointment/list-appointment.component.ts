import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../../user/models/User';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../models/Appointment';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-appointment',
  standalone : true,
  imports: [CommonModule, RouterModule,FormsModule,FooterComponent,MenuComponent,MatTableModule,MatPaginatorModule,MatSortModule,MatInputModule],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css'
})
export class ListAppointmentComponent  implements OnInit {
  displayedColumns: string[] = [ 'createdAt', 'serviceType','vehicle','status']; 
  dataSource = new MatTableDataSource<Appointment>(); 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  appointments: Appointment[] = [];
  todayAppointments: Appointment[] = [];
  allAppointments:Appointment[] = [];
  user: IUser;
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService){}
  ngOnInit(): void {
    const userData =  localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        if(this.user.role == 'mécanicien')this.listAppointmentMechanic();
        else this.listAppointmentCustomer(); 
      }catch (error) {
        console.error('Erreur de parsing JSON :', error);
      }
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  pageEvent(event: any): void {
    
  }

  listAppointmentCustomer(){
    this.appointmentService.findById(this.user._id).subscribe({
      next: (response) =>{
        console.log(response);
        this.dataSource.data = response;
        console.log(typeof response);
      },
      error:(error) => {
        console.log(error);
        console.log(error.error);
        console.error('Erreur lors de la création du rendez-vous:', error);
        this.toastr.error(error.error.message);
      }
    });
  }

  listAppointmentMechanic(){
    this.appointmentService.findByMechanicId(this.user._id).subscribe({
      next: (response) =>{
        console.log(response);
        this.dataSource.data = response;
        this.listAppointement();
      },
      error:(error) => {
        console.log(error);
        console.log(error.error);
        console.error('Erreur lors de la création du rendez-vous:', error);
        this.toastr.error(error.error.message);
      }
    });
  }
  listAppointement(){
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    this.todayAppointments = this.listAppointments.filter(app => {
      const appointmentDate = new Date(app.appointmentDateTime);
      appointmentDate.setUTCHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime() && app.status === "Planifié";
    });
    this.allAppointments = this.listAppointments.filter(app => app.status === "Planifié");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort; 
  }
}
