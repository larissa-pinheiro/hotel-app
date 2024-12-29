import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3001'

  constructor (private http: HttpClient) {}

  /* CRUD */

  // get all reservations
  getReservations(): Observable<Reservation[]> { return this.http.get<Reservation[]>(this.apiUrl + '/reservations') }

  // find a reservation by id using the find method
  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id)
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/reservation/', reservation)
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/reservation/' + id)
  }

  updateReservation(id: string, updatedReservation: Reservation): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/reservation/' + id, updatedReservation)
  }
}
