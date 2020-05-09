import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'shared/services/auth/google/google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private googleAuthService: GoogleAuthService) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.googleAuthService.login();
  }
}
