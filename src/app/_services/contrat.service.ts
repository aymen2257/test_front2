import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  getUserContrats(id:any): Observable<any> {
    return this.http.get(AppConstants.API_URL+`contrat/${id}`, httpOptions);
  }
}
