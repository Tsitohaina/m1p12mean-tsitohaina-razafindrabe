import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {  FormGroup, FormBuilder, Validators,FormsModule,ReactiveFormsModule   } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../common/footer/footer.component';
import { MenuComponent } from '../../../common/menu/menu.component';
import { IUser } from '../../models/User';


@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    FooterComponent,
    MenuComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent {
  userForm: FormGroup;
  user: IUser;
  constructor(
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ){  
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/appointment']);
    }
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      mobil: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  save(){
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.authService.registerUser(userData).subscribe({
        next: response => {
          console.log('Utilisateur créé avec succès', response);
          this.toastr.success('Utilisateur créé avec succès');
          this.router.navigate(['/login']);
        },
        error:error => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
          this.toastr.error('Une erreur est survenue');
        }
    });
    }
  }
}
