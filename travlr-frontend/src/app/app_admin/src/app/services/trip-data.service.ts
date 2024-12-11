// src/app/services/trip-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  baseUrl = 'http://localhost:3000/api'; // Adjust to your API base URL

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Login method
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Register method
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Helper method to handle both login and register
  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = { name: user.name, email: user.email, password: passwd };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }
}
