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
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-list-appointment',
  standalone : true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    FooterComponent,
    MenuComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css'
})
export class ListAppointmentComponent  implements OnInit {
  displayedColumns: string[] = [ 'createdAt' ,'serviceType','vehicle','appointmentDateTime','mechanic','status','statusModif']; 
  dataSource = new MatTableDataSource<Appointment>(); 
  statusList: string[] = ['Planifié','Annulé'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  appointments: Appointment[] = [];
  todayAppointments: Appointment[] = [];
  allAppointments:Appointment[] = [];
  user: IUser;
  hoverText:boolean=false;
  total: number = 0;
  pageSizeOptions: number[] = [];
  show:boolean =false;
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService){}
  ngOnInit(): void {
    const userData =  localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        this.listAppointmentCustomer(); 
      }catch (error) {
        console.error('Erreur:', error);
      }
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  pageEvent(event: any): void {
    
  }

  onMouseEnter() {
    this.hoverText = true; 
  }
  onMouseLeave() {
    this.hoverText = false; 
  }

  listAppointmentCustomer(){
    this.appointmentService.findById(this.user._id).subscribe({
      next: (response) =>{
        this.dataSource = response;
        this.total = response.length;
          let size = this.total / 10;
          let nbpage = '10';
          if(size > 1){
            for (let i = 2; i < size + 1; i++) {
              nbpage += ',';
              nbpage += (i * 10).toString();
            }
          }
          this.pageSizeOptions = nbpage.split(',').map((str) => +str);
          if (this.total != 0) {
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.show = true;
            });
          }
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
    this.todayAppointments = this.dataSource.data.filter(app => {
      const appointmentDate = new Date(app.appointmentDateTime);
      appointmentDate.setUTCHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime() && app.status === "Planifié";
    });
    this.allAppointments = this.dataSource.data.filter(app => app.status === "Planifié");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort; 
  }

  onStatusChange(element: Appointment): void {
    console.log('Statut modifié pour l\'élément:', element);
    let id =  element._id || "";
    console.log(id);
    console.log(element.status);
    this.appointmentService.updateAppointment(id,element.status).subscribe({
      next: (response) =>{
        this.listAppointement();
      },
      error:(error) => {
        console.log(error);
        console.log(error.error);
        console.error('Erreur ', error);
        this.toastr.error(error.error.message);
      }
    });
  }

  isCreationDateInTheFuture(createdAt: string): boolean {
    const creationDate = new Date(createdAt);
    const currentDate = new Date();
    return creationDate > currentDate;
  }
}
