import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../../user/models/User';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../models/Appointment';

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
  constructor(private appointmentService: AppointmentService) {}
  
  ngOnInit(): void {
    const userData =  localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        if(this.user) this.appointment.user = this.user;
        console.log(this.user);
        
      } catch (error) {
        console.error('Erreur de parsing JSON :', error);
      }
    }
  }

  submitAppointment(): void {
    /*this.appointmentService.createAppointment(this.appointment).subscribe(
      (response) => {
        console.log('Rendez-vous créé:', response);
        alert('Rendez-vous confirmé!');
      },
      (error) => {
        console.error('Erreur lors de la création du rendez-vous:', error);
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    );*/
  }
}
