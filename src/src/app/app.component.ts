import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'shared/services/auth/google/google-auth.service';
import { UserService } from 'shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';

  constructor(userService: UserService, auth: GoogleAuthService, route: Router) {
    auth.user$.subscribe(user => {
      if (!user) { return; }
      userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }

      localStorage.removeItem('returnUrl');
      route.navigateByUrl(returnUrl);
    });
  }
}
