import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Result } from './result';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  private urlTestBackend: string = environment.urlTest;

  constructor(private readonly http: HttpClient) {}

  getApiBackend(): Observable<Result> {
    return this.http
      .get(`${this.urlTestBackend}/`, {})
      .pipe(map((result: Result) => result));
  }

  postApiBackend(result: Result): Observable<Result> {
    return this.http
      .post(`${this.urlTestBackend}/`, result)
      .pipe(map((oneResult: Result) => oneResult));
  }
}
