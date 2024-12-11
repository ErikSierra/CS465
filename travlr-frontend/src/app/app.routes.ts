import { LoginComponent } from './components/login/login.component';  // Update path
import { TripListComponent } from './components/trip-list/trip-list.component';  // Update path
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TripListComponent },  // Default route
];
