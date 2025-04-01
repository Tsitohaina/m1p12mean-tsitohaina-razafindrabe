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
    MatOptionModule,MatAutocompleteModule,
    ReactiveFormsModule],
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
  displayedColumns: string[] = [ 'createdAt', 'Client' ,'serviceType','vehicle','appointmentDateTime','status','mechanic']; 
  dataSource = new MatTableDataSource<Appointment>(); 
  user: IUser;
  show:boolean =false;
  hoverText:boolean=false;
  hoverTextMechanic:boolean=false;
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
          this.show = true;
        }
      });
    }
    appointments = [
      { id: 1, title: 'Rendez-vous 1', date: new Date(), assigned: false, assignedUser: null },
      { id: 2, title: 'Rendez-vous 2', date: new Date(), assigned: false, assignedUser: null },
      { id: 3, title: 'Rendez-vous 3', date: new Date(), assigned: false, assignedUser: null },
    ];
  
    // Liste des utilisateurs disponibles
    availableUsers = [
      { id: 1, name: 'Utilisateur 1' },
      { id: 2, name: 'Utilisateur 2' },
      { id: 3, name: 'Utilisateur 3' },
    ];
  
    // Fonction pour assigner un utilisateur à un rendez-vous
    assignUserToAppointment(appointment: any): void {
      const user = this.availableUsers.find(user => user.id === appointment.assignedUser);
      if (user) {
        appointment.assigned = true;
        alert(`L'utilisateur ${user.name} a été assigné au rendez-vous ${appointment.title}`);
      } else {
        alert('Veuillez sélectionner un utilisateur.');
      }
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
      /*this.mechanics.forEach((element:IUser) => {
        if (element.name == event) {
          console.log(element);
          
        }
      });*/
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

    onMouseEnter() {
      this.hoverText = true; 
    }
    onMouseLeave() {
      this.hoverText = false; 
    }
    onMouseEnterMechanic() {
      this.hoverTextMechanic = true; 
    }
    onMouseLeaveMechanic() {
      this.hoverTextMechanic = false; 
    }
}
