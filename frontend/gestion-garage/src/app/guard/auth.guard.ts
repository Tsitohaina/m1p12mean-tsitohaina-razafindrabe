import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../user/service/auth.service';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Vérifie si l'utilisateur est authentifié (en utilisant un service d'authentification)
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Si l'utilisateur n'est pas authentifié, redirige-le vers la page de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
