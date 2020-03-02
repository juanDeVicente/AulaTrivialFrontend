import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServoService {

  constructor(private http: HttpClient) { }

  moveServo() {
    return this.http.get(environment.backendUrl + 'servo');
  }
}
