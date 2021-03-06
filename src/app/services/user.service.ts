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
  public identity;
  public token;
  public imageUrl: string;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }


  getUser(userId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'user/detail/' + userId, {headers});
  }

  register(user): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'register', params, {headers});
  }

  signup(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = 'true';
    }

    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'login', params, {headers});
  }


  update(token, user): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;

    const headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.put(this.url + 'user/update', params, {headers});
  }

  getPosts(userId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'post/user/' + userId, {headers});
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;

  }

  getToken() {
    const token = localStorage.getItem('token');

    if (token && token !== 'undefined') {
      this.token = token;
    } else {
      this.token = token;
    }

    return this.token;

  }


}
