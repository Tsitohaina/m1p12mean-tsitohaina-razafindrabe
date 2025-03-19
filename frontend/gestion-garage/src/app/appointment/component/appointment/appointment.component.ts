import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../../user/models/User';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../models/Appointment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment',
  standalone : true,
  imports: [CommonModule, RouterModule,FormsModule,FooterComponent,MenuComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  appointment : Appointment;
  user: IUser;
 
  constructor(private appointmentService: AppointmentService,private toastr: ToastrService) {}
  
  ngOnInit(): void {
    const userData =  localStorage.getItem('user');
    if (userData) {
      try {
        console.log(JSON.parse(userData));
        this.user = JSON.parse(userData);
        this.appointment = {
          user: this.user, 
          vehicle: '',
          appointmentDateTime: new Date(),
          serviceType: 'Changement d\'huile', 
          status: 'Planifié',
          date: new Date(),
        };
        console.log(this.user);
       
      } catch (error) {
        console.error('Erreur de parsing JSON :', error);
      }
    }
  }

  submitAppointment(): void {
    console.log("createAppointment");
    console.log(this.appointment);
    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: (response) =>{
        console.log('Rendez-vous créé:', response);
        this.toastr.success('Rendez-vous confirmé!');
      },
      error:(error) => {
        console.log(error);
        console.error('Erreur lors de la création du rendez-vous:', error);
        this.toastr.error('Une erreur s\'est produite. Veuillez réessayer.');
      }
    });
  }
}
