import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = 'http://localhost:5000/api/candidates';

  constructor(private http: HttpClient) {}

  createCandidate(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getCandidates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}