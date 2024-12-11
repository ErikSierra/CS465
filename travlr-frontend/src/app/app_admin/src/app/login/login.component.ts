// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formError: string = '';
  credentials = { name: '', email: '', password: '' };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  // Submit the login form
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      this.doLogin();
    }
  }

  // Perform login operation
  private doLogin(): void {
    let newUser = { name: this.credentials.name, email: this.credentials.email } as User;
    this.authenticationService.login(newUser, this.credentials.password);

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        }
      }, 3000);
    }
  }
}
