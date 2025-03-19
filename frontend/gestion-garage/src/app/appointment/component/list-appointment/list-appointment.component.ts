import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../../user/models/User';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../models/Appointment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-appointment',
  standalone : true,
  imports: [CommonModule, RouterModule,FormsModule,FooterComponent,MenuComponent],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css'
})
export class ListAppointmentComponent  implements OnInit {
  appointments: Appointment[] = [];
  user: IUser;
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService){}
  ngOnInit(): void {
    const userData =  localStorage.getItem('user');
    if (userData) {
      try {
        console.log(JSON.parse(userData));
        this.user = JSON.parse(userData);
        console.log(this.user._id);
        this.appointmentService.findById(this.user._id).subscribe({
          next: (response) =>{
            console.log('Rendez-vous créé:', response);
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
}
