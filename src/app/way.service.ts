import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Way } from './way';

@Injectable()
export class WayService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private waysUrl = 'api/ways';

  constructor(private http: Http) { }

  getWays(): Promise<Way[]> {
  	return this.http.get(this.waysUrl)
  					.toPromise()
  					.then(response => response.json().data as Way[])
  					.catch(this.handleError);
  }

  addWay(way: Way): Promise<Way> {
    return this.http.post(this.waysUrl, JSON.stringify(way), this.headers)
                    .toPromise()
                    .then(response => response.json().data as Way)
                    .catch(this.handleError);
  }

  deleteWay(id: number): Promise<Way> {
    const url = `${this.waysUrl}/${id}`;

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
