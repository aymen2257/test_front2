import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { ITypePercentage } from '../interface/count.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  getUserContrats(id: any): Observable<any> {
    return this.http.get(AppConstants.CONTRAT_URL + `Mycontrat/${id}`, httpOptions);
  }

  getAllContrats(): Observable<any> {
    return this.http.get(AppConstants.CONTRAT_URL + "listeContrats", httpOptions);
  }

  getTypePercentage(): Observable<Array<ITypePercentage>> {
    return this.http
      .get<Array<ITypePercentage>>(AppConstants.CONTRAT_URL + "PercentageByBranche", httpOptions)
      .pipe(map((d: Array<ITypePercentage>) => d));
  }

  createPaymentSession(contratId: number): Observable<any> {
    return this.http.post<any>(AppConstants.CONTRAT_URL + `pay/${contratId}`, {}, httpOptions);
  }

  updatePaymentStatus(sessionId: string, success: boolean): Observable<any> {
    return this.http.post<any>(AppConstants.CONTRAT_URL + 'update-payment-status', { sessionId, success }, httpOptions);
  }

  getExpiredContracts(userId: number): Observable<any> {
    return this.http.get<any>(AppConstants.CONTRAT_URL + `expired-contracts/${userId}`, httpOptions);
  }

  renewContract(contratId: number): Observable<any> {
    return this.http.post<any>(AppConstants.CONTRAT_URL + `renew-contract/${contratId}`, {}, httpOptions);
  }
}
