import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { TripsComponent }      from './trips/trips.component';
import { TripFormComponent } from './trip-form/trip-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'dashboard/trips/detail/:id', component: TripFormComponent },
  { path: 'dashboard/trips/create', component: TripFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
