import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../../user/models/User';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../models/Appointment';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../user/service/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-appointment',
  standalone : true,
  imports: [CommonModule,
    RouterModule,FormsModule,FooterComponent,MenuComponent,
    MatFormFieldModule,
    MatOptionModule,MatAutocompleteModule,ReactiveFormsModule,MatInputModule ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  appointment : Appointment;
  user: IUser;
  mechanics:IUser[] = []; 
  filteredMechanics:Observable<IUser[]>;
  searchMechanic: string = ''; 
  userControl = new FormControl('');
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private userService:UserService,
    private router: Router) {}
  
  ngOnInit(): void {
    const userData =  localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        console.log(this.user);
        if(this.user.role == "mécanicien") this.router.navigate(['/mechanic/appointment']);
        this.appointment = {
          user: this.user, 
          vehicle: '',
          appointmentDateTime: new Date(),
          serviceType: 'Changement d\'huile', 
          status: 'Planifié'
        };
      } catch (error) {
        console.error('Erreur de parsing JSON :', error);
      }
      this.findUserByRole();
      this.getlistUser();
    }
  }

  selectUser(event: any) {
      this.mechanics.forEach((element:IUser) => {
        if (element.name == event) {
          console.log(element);
          this.appointment.mechanic = element;
        }
      });
  }
  

  submitAppointment(): void {
    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: (response) =>{
        this.toastr.success('Rendez-vous confirmé!');
        this.router.navigate(['/customer/list-appointment']);
      },
      error:(error) => {
        console.log(error);
        console.error('Erreur lors de la création du rendez-vous:', error);
        this.toastr.error('Une erreur s\'est produite. Veuillez réessayer.');
      }
    });
  }

  onMechanicSelected(event: any): void {
    const selectedMechanicName = event.option.value;
    const selectedMechanic = this.mechanics.find(mechanic => mechanic.name === selectedMechanicName);
    if (selectedMechanic) {
      this.appointment.mechanic = selectedMechanic; 
    }
  }


  findUserByRole(){
    this.userService.findUserByRole('mécanicien').subscribe({
      next: (response) =>{
        this.mechanics = response;
        console.log(this.mechanics);
      },
      error:(error) => {
        console.log(error);
        console.error('ERROR', error);
      }
    });
  }

  getlistUser() {
    this.userService.findUserByRole('mécanicien').subscribe({
      next: (data) =>{
        console.log(data);
        if (data) {
          this.mechanics = data;
          this.filteredMechanics = this.userControl.valueChanges.pipe(
            startWith(''),
            map((value: any) => this._filter(value || ''))
          );
        } else {
          console.log(data.message);
        }
      },
      error:(error) => {
        console.log(error);
      }
    });
  }
  private _filter(value: string): IUser[] {
    const filterValue = value.toLowerCase();
    return this.mechanics.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

}
