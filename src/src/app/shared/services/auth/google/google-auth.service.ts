import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { auth } from 'firebase';
import { UserService } from 'shared/services/user/user.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService extends AuthService {

  constructor(afAuth: AngularFireAuth, route: ActivatedRoute, userService: UserService) {
    super(new auth.GoogleAuthProvider(), afAuth, route, userService);
  }
}
