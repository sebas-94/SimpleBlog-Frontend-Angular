import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {global} from '../global';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  create(token, category): Observable<any> {
    const json = JSON.stringify(category);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.post(this.url + 'category', params, {headers});
  }

  getCategories(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'category', {headers});
  }
}
