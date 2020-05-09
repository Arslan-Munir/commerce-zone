import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { GoogleAuthService } from 'shared/services/auth/google/google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: GoogleAuthService, private route: Router) { }

  canActivate(root, state: RouterStateSnapshot) {
    return this.auth.user$
      .pipe(map(user => {
        if (user) {
          return true;
        }

        this.route.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }));
  }
}
