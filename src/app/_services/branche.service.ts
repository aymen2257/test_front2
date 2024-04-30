import { Injectable } from '@angular/core';
import { AppConstants } from '../common/app.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BrancheService {

  constructor(private http: HttpClient) { }

  getBrancheById(id:any): Observable<any> {
    return this.http.get(AppConstants.API_URL+`branche/${id}`, httpOptions);
  }

  getAllBranches(): Observable<any> {
    return this.http.get(AppConstants.API_URL+"branches", httpOptions);
  }

  addBranche(branche :any): Observable<any> {
    return this.http.post(AppConstants.API_URL+"addbranche",branche, httpOptions);
  }

  editBranche(branche :any): Observable<any> {
    return this.http.put(AppConstants.API_URL+"editbranche",branche, httpOptions);
  }

  deleteBranche(id:any): Observable<any> {
    return this.http.delete(AppConstants.API_URL+`deleteBranche/${id}`, httpOptions);
  }

}
