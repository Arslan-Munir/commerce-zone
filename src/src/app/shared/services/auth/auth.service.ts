import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user.model';
import { UserService } from 'shared/services/user/user.service';

export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private authProvider: any,
              private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService) {

    this.user$ = afAuth.authState;
}

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth
      .signInWithPopup(this.authProvider)
      .catch((error) => {
        console.log(error);
      });
  }

  logOut() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.userService.get(user.uid);
          }

          return of(null);
        })
      );
  }
}
