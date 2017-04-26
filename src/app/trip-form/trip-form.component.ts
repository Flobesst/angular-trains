import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { Trip }              from '../trip';
import { TripService }       from '../trip.service';
import { City }              from '../city';
import { CityService }       from '../city.service';
import { Way }               from '../way';
import { WayService }        from '../way.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnInit {
  cities: Observable<City[]>;
  ways: Way[];
  trip: Trip = new Trip(null, null, null, null, 0, false);
  editMode: boolean;
  
  private searchTerms = new Subject<string>();

  constructor(
    private tripService: TripService,
    private cityService: CityService,
    private wayService: WayService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  searchCity(term: string): void {
    this.searchTerms.next(term);
  }

  getWays(): void {
    this.wayService.getWays()
                   .then(ways => this.ways = ways);
  }

  onSubmit(): void {
    if (this.editMode) {
      this.tripService.updateTrip(this.trip)
                      .then(() => this.goBack());
    } else {
      this.tripService.createTrip(this.trip)
                      .then(() => this.goBack())
    }
  }

  goBack(): void {
    this.location.back();
  }

  // TODO: optimize params ?
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.editMode = true;
        this.route.params
              .switchMap((params: Params) => this.tripService.getTrip(+params['id']))
              .subscribe(trip => this.trip = trip);
      }
      else {
        this.editMode = false;
      }
    });

    this.getWays();
    this.cities = this.searchTerms
                      .debounceTime(300) // 300ms between each call
                      .distinctUntilChanged() // only triggers if term is changed
                      .switchMap(term => term ? this.cityService.search(term) : Observable.of<City[]>([]))
                      .catch(error => {
                        console.error(error);
                        return Observable.of<City[]>([]);
                      });

  }

}
