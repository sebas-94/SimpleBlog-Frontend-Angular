import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {global} from '../global';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }


  create(token, post): Observable<any> {
    const json = JSON.stringify(post);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.post(this.url + 'post', params, {headers});
  }

  getPosts(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'post', {headers});
  }

  getPost(id): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'post/' + id, {headers});
  }

  update(token, post): Observable<any> {
    const json = JSON.stringify(post);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.put(this.url + 'post/' + post.id, params, {headers});
  }

  delete(token, post): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.delete(this.url + 'post/' + post.id, {headers});

  }


}
