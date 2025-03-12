import { Component } from '@angular/core';
import { AuthService } from '../../user/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    private authService:AuthService,
    private router: Router
    ){  
  }
  logout(){
    console.log('test');
    this.authService.logout();
    this.router.navigate(['']);
  }
}
