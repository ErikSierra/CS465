import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'] // Corrected from "styleUrl"
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any; // Use the Input decorator to pass trip data from parent

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Trip Image:', this.trip.image);
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}
