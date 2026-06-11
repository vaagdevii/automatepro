import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = 'http://localhost:5000/api/leads';

  constructor(private http: HttpClient) {}

  createLead(leadData: any): Observable<any> {
    return this.http.post(this.apiUrl, leadData);
  }

  getLeads(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}