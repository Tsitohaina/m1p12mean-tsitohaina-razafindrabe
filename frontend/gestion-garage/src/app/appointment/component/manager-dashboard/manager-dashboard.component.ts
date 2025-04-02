import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../../user/models/User';
import { UserService } from '../../../user/service/user.service';
import { Appointment } from '../../models/Appointment';
import { AppointmentService } from '../../service/appointment.service';
import { FilterUsersPipe } from "../../../pipe/filter-users.pipe";

@Component({
  selector: 'app-manager-dashboard',
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    FooterComponent,
    MenuComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatOptionModule, MatAutocompleteModule,
    ReactiveFormsModule, FilterUsersPipe],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css',
  animations: [
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ManagerDashboardComponent implements OnInit {
  displayedColumns: string[] = [ 'createdAt', 'Client' ,'serviceType','vehicle','appointmentDateTime','status','mechanic','assignation']; 
  dataSource = new MatTableDataSource<Appointment>(); 
  user: IUser;
  show:boolean =false;
  statusList: string[] = ['Planifié', 'En cours', 'Terminé', 'Annulé'];
  total: number = 0;
  pageSizeOptions: number[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mechanics:IUser[] = []; 
  filteredMechanics:Observable<IUser[]>;
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
            this.listAppointment();
            this.getlistUser();
          }catch (error) {
            console.error('Erreur de parsing JSON :', error);
            this.show = true;
          }
        }
    }
    listAppointment(){
      this.appointmentService.findByStatus('Planifié').subscribe({
        next: (response) =>{
          console.log(response);
          
          this.dataSource = response.map((appointment: any) => ({
            ...appointment,
            mechanicSearch: ''
          }));
          

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
          this.show = true;
        }
      });
    }
    isCreationDateInTheFuture(createdAt: string): boolean {
      const creationDate = new Date(createdAt);
      const currentDate = new Date();
      return creationDate > currentDate;
    }
    onStatusChange(element: any): void {
      console.log('Statut modifié pour l\'élément:', element);
      let id =  element._id || "";
      this.appointmentService.updateAppointment(id, element.status).subscribe({
        next: (response) =>{
          //this.listAppointement();
        },
        error:(error) => {
          console.log(error);
          console.log(error.error);
          console.error('Erreur lors de la création du rendez-vous:', error);
          this.toastr.error(error.error.message);
        }
      });
    }
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    selectMechanic(event: any,element:any) {
      console.log(event);
      console.log(element);

      this.appointmentService.updateAppointmentMechnic(element._id, event).subscribe({
        next: () => {this.listAppointment();this.toastr.success('Mécanicien assigné avec succès !')},
        error: (error) => {
          console.error('Erreur lors de l\'assignation:', error);
          this.toastr.error(error.error.message);
        }
      });


      /*this.appointmentService.updateAppointmentMechnic(id,element).subscribe({
        next: (response) =>{
          this.listAppointment();
        },
        error:(error) => {
          console.log(error);
          console.log(error.error);
          console.error('Erreur ', error);
          this.toastr.error(error.error.message);
        }
      });*/
    }

    onMechanicSearchInput(event: Event, element: any) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement) {
        element.mechanicSearch = inputElement.value;
      }
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
