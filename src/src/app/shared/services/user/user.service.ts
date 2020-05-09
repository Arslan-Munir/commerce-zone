import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(firebaseUser: firebase.User) {
    const user = this.userDetails(firebaseUser);
    this.db.object('/users/' + user.uid).update(user);
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }

  private userDetails(firebaseUser: firebase.User): AppUser {
    const user = new AppUser();
    user.uid = firebaseUser.uid;
    user.email = firebaseUser.email;
    user.photoURL = firebaseUser.photoURL;
    user.name = firebaseUser.displayName;
    return user;
  }
}
