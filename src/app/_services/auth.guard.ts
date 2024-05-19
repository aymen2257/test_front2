import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['requiredRoles'];
    const currentUser = this.tokenStorageService.getUser();

    if (!currentUser) {
      Swal.fire({
        icon: 'warning',
        title: 'Non autorisé',
        text: 'Vous devez vous connecter pour accéder à cette page.',
        confirmButtonColor: '#3085d6'
      });
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (requiredRoles && requiredRoles.length && !requiredRoles.some((role: any) => currentUser.roles.includes(role))) {
      Swal.fire({
        icon: 'error',
        title: 'Accès refusé',
        text: 'Vous n\'avez pas la permission d\'accéder à cette page.',
        confirmButtonColor: '#d33'
      });
      this.router.navigate(['/home']); // or any other fallback route
      return false;
    }

    return true;
  }
}
