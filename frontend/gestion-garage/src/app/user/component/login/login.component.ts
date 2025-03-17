import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, RouterModule,FormsModule,ToastrModule],
  providers: [provideAnimations()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  mail:string;
  password:string;
  show=false;
  constructor(
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
    ){  
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/appointment']);
    }
    this.show=true;
  }

  login() {
    console.log("test");
    this.authService.login(this.mail, this.password).subscribe({
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
