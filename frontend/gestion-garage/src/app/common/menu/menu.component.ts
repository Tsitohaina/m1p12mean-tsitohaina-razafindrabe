import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../user/service/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../user/models/User';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { F } from '@angular/cdk/a11y-module.d-7d03e079';

@Component({
  selector: 'app-menu',
  imports: [RouterModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  @Input()  user: IUser;
  userData:any;
  pageDisplay = false;
  show = true;
  constructor(
    private authService:AuthService,
    private router: Router
    ){  
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.userData =  localStorage.getItem('user');
      if( this.router.url.includes("login") ||  this.router.url.includes("subscription")) {this.show = false;}
    }
    this.pageDisplay = true;
  }
  logout(){
    console.log('test');
    this.authService.logout();
    this.router.navigate(['']);
  }
  toList(){
    if(this.user){
      if(this.user.role == 'mécanicien') this.router.navigate(['/mechanic/list-appointment']);
      else this.router.navigate(['/customer/list-appointment']);
    }
  }
}
