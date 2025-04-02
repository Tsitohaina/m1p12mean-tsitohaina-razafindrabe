import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../user/models/User';
import { UserService } from '../../user/service/user.service';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-page-not-found',
  imports: [FooterComponent,MenuComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit {
  user: IUser;
  constructor(
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute) {}
    ngOnInit(): void {
      const userData =  localStorage.getItem('user');
    if (userData) {
      try {
          this.user = JSON.parse(userData);
      } catch (error) {
        console.error('Erreur de parsing JSON :', error);
      }
    }
  }

  toUrlPrecedent(){
    //const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigate(['/']);
  }
}
