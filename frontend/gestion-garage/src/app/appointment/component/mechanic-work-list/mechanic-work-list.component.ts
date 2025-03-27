import { animate, style, transition, trigger } from '@angular/animations';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../../user/models/User';
import { Appointment } from '../../models/Appointment';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-mechanic-work-list',
  imports: [CommonModule, 
    RouterModule,
    ToastrModule,
    FooterComponent,
    MenuComponent],
  templateUrl: './mechanic-work-list.component.html',
  styleUrl: './mechanic-work-list.component.css',
  animations: [
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class MechanicWorkListComponent  implements OnInit {
  user: IUser;
  listAppointments: Appointment[] = [];
  todayAppointments: Appointment[] = [];
  allAppointments:Appointment[] = [];
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService){}
  ngOnInit(): void {
    const userData =  localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        this.appointmentService.findByMechanicId(this.user._id).subscribe({
          next: (response) =>{
            console.log(response);
            this.listAppointments = response;
            this.listAppointement();
          },
          error:(error) => {
            console.log(error);
            console.log(error.error);
            console.error('Erreur lors de la création du rendez-vous:', error);
            this.toastr.error(error.error.message);
          }
        });
      }catch (error) {
        console.error('Erreur de parsing JSON :', error);
      }
    }
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
}
