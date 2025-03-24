import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../common/footer/footer.component';
import { MenuComponent } from '../common/menu/menu.component';
import { IUser } from '../user/models/User';
import { AuthService } from '../user/service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FooterComponent,MenuComponent,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  user: IUser;

  constructor(private authService:AuthService,private router: Router,){}
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/appointment']);
    }
  }
}
