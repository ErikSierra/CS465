// src/app/services/authentication.service.ts
import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Get token from storage
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');
    return out ? out : '';
  }

  // Save token to storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Remove token (logout)
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check if user is logged in (token validation)
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000); // Check expiration
    }
    return false;
  }

  // Get current user (after confirming user is logged in)
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          this.authResp = value;
          this.saveToken(this.authResp.token); // Save token
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  // Register method
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          this.authResp = value;
          this.saveToken(this.authResp.token); // Save token
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }
}
