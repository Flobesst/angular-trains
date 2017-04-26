import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Trip }              from '../trip';
import { TripService }       from '../trip.service';

import { City }              from '../city';
import { CityService }       from '../city.service';

import { Way }               from '../way';
import { WayService }        from '../way.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  trips: Trip[]  = [];
  cities: City[] = [];
  ways: Way[]    = [];

  constructor(
    private tripService: TripService,
    private cityService: CityService,
    private wayService: WayService,
    private router: Router
  ) { }

  getTrips(): void {
    this.tripService.getTrips()
            .then(trips => this.trips = trips);
  }

  getCities(): void {
    this.cityService.getCities()
            .then(cities => this.cities = cities);
  }

  getWays(): void {
    this.wayService.getWays()
            .then(ways => this.ways = ways);
  }

  addCity(name): void {
    const city = new City(null, name);

    this.cityService.addCity(city)
                    .then(city => this.cities.push(city))
  }

  addWay(name): void {
    const way = new Way(null, name);

    this.wayService.addWay(way)
                    .then(way => this.ways.push(way))
  }

  deleteTrip(trip: Trip): void {
    this.tripService.deleteTrip(trip.id)
                    .then(() => this.trips = this.trips.filter(t => t !== trip));
  }

  deleteCity(city: City): void {
    this.cityService.deleteCity(city.id)
                    .then(() => this.cities = this.cities.filter(c => c !== city));
  }

  deleteWay(way: Way): void {
    this.wayService.deleteWay(way.id)
                   .then(() => this.ways = this.ways.filter(c => c !== way));
  }

  ngOnInit() {
  	this.getTrips();
    this.getCities();
    this.getWays();
  }

}
