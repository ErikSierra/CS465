import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip'; // Import Trip model
import { TripDataService } from '../services/trip-data.service'; // Import TripDataService
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component'; // Import TripCardComponent

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent], // Add TripCardComponent here
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService] // Register TripDataService as a provider
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = []; // Define trips as an array of Trip
  message: string = ''; // Message to display status

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Private method to fetch trips from the service
  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => {
        this.trips = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database.';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  // Lifecycle hook to initialize the component
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff(); // Call the private method to fetch trips
  }
}
