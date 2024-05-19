import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AgenceService {


  constructor(private http: HttpClient) { }
  getAgencesByCite(cite: string): Observable<any[]> {
    return this.http.get<any[]>(`${AppConstants.API_URL}/agencies/byCite?cite=${encodeURIComponent(cite)}`, httpOptions);
  }

  getGovernorates(): Observable<string[]> {
    return this.http.get<string[]>(AppConstants.API_URL+ `agencies/governorates`, httpOptions);
  }

  getAgencesByGovernorate(governorate: string): Observable<any[]> {
    return this.http.get<any[]>(AppConstants.API_URL+ `agencies/byGovernorate?governorate=${encodeURIComponent(governorate)}`, httpOptions);
  }
  getNearestAgence(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`${AppConstants.API_URL}agencies/nearest?lat=${lat}&lon=${lon}`, httpOptions);
  }
}
