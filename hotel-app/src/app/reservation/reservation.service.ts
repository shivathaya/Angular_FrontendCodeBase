import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // This service will handle the reservation data and logic
  private reservations: Reservation[] = [];

  constructor() {
    let savedReservations = localStorage.getItem('reservations');
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
    console.log('Reservations loaded from localStorage:', this.reservations);
   }

  //CRUD operations

  getReservations(): Reservation[] {
    return this.reservations;
  }
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(reservation => reservation.id === id);
  }
  addReservation(reservation: Reservation): void {
    reservation.id = new Date().getTime().toString(); // Generate a unique ID
    this.reservations.push(reservation);
    console.log('Reservation added:', this.reservations);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
      alert('Reservation deleted successfully: ' + id);
    } else {
      alert('Reservation not found: ' + id);
    }
  }
  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      updatedReservation.id = id; // Ensure the ID remains the same
      this.reservations[index] = updatedReservation;
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }


}
