import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'] // Corrected from "styleUrl" to "styleUrls"
})
export class AddTripComponent implements OnInit {
  addForm!: FormGroup; // Form group for trip data
  submitted = false; // Tracks if the form was submitted

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validators
    this.addForm = this.formBuilder.group({
      _id: [], // Optional field for the trip ID
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Method called on form submission
  public onSubmit(): void {
    this.submitted = true;

    // If the form is valid, submit the trip data
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value).subscribe({
        next: (data: any) => {
          console.log(data); // Log the response from the service
          this.router.navigate(['']); // Navigate to the trip listing page
        },
        error: (error: any) => {
          console.error('Error: ' + error); // Log errors
        }
      });
    }
  }

  // Getter for easy access to form controls
  get f() {
    return this.addForm.controls;
  }
}
