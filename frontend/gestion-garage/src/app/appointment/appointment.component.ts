import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../common/footer/footer.component';
import { MenuComponent } from '../common/menu/menu.component';

@Component({
  selector: 'app-appointment',
  standalone : true,
  imports: [CommonModule, RouterModule,FormsModule,FooterComponent,MenuComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  appointment = {
    car: '',
    service: 'oilChange',
    date: ''
  };

  submitAppointment(){
    if (this.appointment.car && this.appointment.service && this.appointment.date) {
      alert('Rendez-vous confirmé!');
    } else {
      alert('Veuillez remplir tous les champs!');
    }
  }
}
