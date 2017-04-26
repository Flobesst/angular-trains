import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Trip } from './trip';

@Injectable()
export class TripService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private tripsUrl = 'api/trips';

  constructor(private http: Http) { }

  getTrips(): Promise<Trip[]> {
  	return this.http.get(this.tripsUrl)
  					.toPromise()
  					.then(response => response.json().data as Trip[])
  					.catch(this.handleError);
  }

  getTrip(id: number): Promise<Trip> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json().data as Trip)
                    .catch(this.handleError);
  }

  createTrip(trip: Trip): Promise<Trip> {
    return this.http.post(this.tripsUrl, JSON.stringify(trip), this.headers)
                    .toPromise()
                    .then(response => response.json().data as Trip)
                    .catch(this.handleError);
  }

  updateTrip(trip: Trip): Promise<Trip> {
    const url = `${this.tripsUrl}/${trip.id}`;

    return this.http.put(url, JSON.stringify(trip), this.headers)
                    .toPromise()
                    .then(() => trip)
                    .catch(this.handleError);
  }

  deleteTrip(id: number): Promise<void> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http.delete(url, { headers: this.headers })
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
