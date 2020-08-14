import {Injectable} from '@angular/core';

// Global configuration
import {global} from '../global';

// Imports
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// Modelos
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  test() {
    return 'Hola Mundo desde un servicio!';
  }

  register(user): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'register', params, {headers});

  }

}
