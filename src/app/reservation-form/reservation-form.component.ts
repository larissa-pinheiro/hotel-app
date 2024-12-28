import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      guestPhone: ['', Validators.required],
      roomNumber: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value

      this.reservationService.addReservation(reservation)

      this.router.navigate(['/reservations'])
    }
  }
}
