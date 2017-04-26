import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TripService } from './trip.service';
import { CityService } from './city.service';
import { WayService } from './way.service';
import { TripFormComponent } from './trip-form/trip-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    DashboardComponent,
    TripFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    TripService,
    CityService,
    WayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
