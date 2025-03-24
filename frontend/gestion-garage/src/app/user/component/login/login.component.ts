import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MenuComponent } from '../../../common/menu/menu.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { IUser } from '../../models/User';
import {  FormGroup, FormBuilder, Validators,FormsModule,ReactiveFormsModule   } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, RouterModule,FormsModule,ReactiveFormsModule,ToastrModule,FooterComponent,MenuComponent],
  providers: [provideAnimations()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  mail:string;
  password:string;
  show=false;
  user: IUser;
  userForm: FormGroup;
  constructor(
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ){  
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/appointment']);
    }else{
      this.userForm = this.formBuilder.group({
        mail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
    this.show=true;
  }

  login() {
    console.log("test");
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value.mail, this.userForm.value.password).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.toastr.success('Connexion réussie!');
          const returnUrl = this.route.snapshot.queryParams['returnUrl'];
          if(!returnUrl) this.authService.redirectionUserRole(response.user);
          else this.router.navigate([returnUrl]);
        },
        error: (error) => {
          console.error('Erreur lors de la connexion', error);
          this.toastr.error('Identifiants incorrects.');
        }
      });
    }
  }

}
