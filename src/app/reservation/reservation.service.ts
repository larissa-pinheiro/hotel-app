import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = []

  /* CRUD */

  // get all reservations
  getReservations(): Reservation[] { return this.reservations }

  // find a reservation by id using the find method
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(reservation => reservation.id === id)
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation)
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(reservation => reservation.id === id)

    this.reservations.splice(index, 1)
  }

  updateReservation(updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(reservation => reservation.id === updatedReservation.id)

    this.reservations[index] = updatedReservation
  }
}
