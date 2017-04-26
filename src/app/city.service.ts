import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { City } from './city';

@Injectable()
export class CityService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private citiesUrl = 'api/cities';

  constructor(private http: Http) { }

  search(term: string): Observable<City[]> {
    const url = `${this.citiesUrl}/?name=${term}`;

    return this.http.get(url)
                    .map(response => response.json().data as City[]);
  }

  getCities(): Promise<City[]> {
  	return this.http.get(this.citiesUrl)
  					.toPromise()
  					.then(response => response.json().data as City[])
  					.catch(this.handleError);
  }

  addCity(city: City): Promise<City> {
    return this.http.post(this.citiesUrl, JSON.stringify(city), this.headers)
                    .toPromise()
                    .then(response => response.json().data as City)
                    .catch(this.handleError);
  }

  deleteCity(id: number): Promise<City> {
    const url = `${this.citiesUrl}/${id}`;

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
