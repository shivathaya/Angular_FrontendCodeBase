import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  //for validating form we need to inject form builder 
  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
    ){
  }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      //[iNITIAL VALUE, VALIDATIONS]
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });

    let id = this.route.snapshot.paramMap.get('id');  // Get the reservation ID from the route parameters
    // Check if the ID exists
    if (id) {
      let reservation = this.reservationService.getReservation(id); // Fetch the reservation by ID
      // Check if the reservation exists
      if (reservation) {
        this.reservationForm.patchValue(reservation); // Fill the form with existing reservation data
      }else{
        alert('Reservation not found!'); // Handle the case where the reservation is not found
      }
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      // Handle form submission
      console.log('Form submitted:');
      let id = this.route.snapshot.paramMap.get('id');  // Get the reservation ID from the route parameters
    if (id) {  // updating the reservation
      this.reservationService.updateReservation(id, this.reservationForm.value);
      alert('Reservation updated successfully!');
    } else {  // adding a new reservation
      this.reservationService.addReservation(this.reservationForm.value);
      alert('Reservation added successfully!');
    }
      // Reset the form
      this.reservationForm.reset();
      this.router.navigate(['/listReservations']); // Redirect to the reservation list page
    }
  }
}