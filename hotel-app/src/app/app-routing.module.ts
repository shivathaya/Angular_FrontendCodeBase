import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"listReservations", component: ReservationListComponent},
  {path:"newReservation", component: ReservationFormComponent},
  {path:"editReservation/:id", component: ReservationFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
