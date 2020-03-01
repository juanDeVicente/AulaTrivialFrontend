import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrivialService {
  //trivialAPIUrl = "https://opentdb.com/api.php?amount=32&category=18&difficulty=easy&type=multiple";

  constructor(private http: HttpClient) { }

  getQuestions()
  {
    return this.http.get<[]>(environment.backendUrl + 'questions');
  }
}
