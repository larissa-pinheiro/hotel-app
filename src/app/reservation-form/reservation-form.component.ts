import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private activatedRouter: ActivatedRoute
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

    let id = this.activatedRouter.snapshot.paramMap.get('id')
    if (id) {
      this.reservationService.getReservation(id).subscribe(reservation => {
        if (reservation) {
          this.reservationForm.patchValue(reservation)
      }
      })
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value

      let id = this.activatedRouter.snapshot.paramMap.get('id')
      if (id) {
        // update
        this.reservationService.updateReservation(id, reservation).subscribe(() => {
          console.log('Update request processed')
        })
      } else {
        // create a new
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log('New reservation processed')
        })
      }

      this.router.navigate(['/reservations'])
    }
  }
}
