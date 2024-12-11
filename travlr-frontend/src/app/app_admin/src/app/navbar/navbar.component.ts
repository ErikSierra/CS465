// src/app/components/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Logout method
  public onLogout(): void {
    this.authenticationService.logout();
  }
}
