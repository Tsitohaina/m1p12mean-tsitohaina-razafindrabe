import { Component, Input } from '@angular/core';
import { AuthService } from '../../user/service/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../user/models/User';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input()  user: IUser;
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
