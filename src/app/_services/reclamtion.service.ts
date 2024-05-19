import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReclamtionService {

  constructor(private http:HttpClient) { }
  getUserReclamations(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'reclamations/my-reclamations', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  getAllReclamations(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'reclamations/getall', httpOptions);
  }

  // Save a reclamation with file upload
  // This method needs to handle FormData, which is not JSON, so we need different HTTP options
  saveReclamation(reclamation: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    Object.keys(reclamation).forEach(key => {
      if (reclamation[key] != null) {
        formData.append(key, reclamation[key]);
      }
    });

    return this.http.post(AppConstants.API_URL + 'reclamations/upload', formData, {
      responseType: 'json'  // Specify that the response is expected to be in JSON format
    });
  }
  updateReclamationStatus(id: number, status: any): Observable<any> {
    return this.http.put(`${AppConstants.API_URL}reclamations/${id}/status/${status}`, {}, httpOptions);
  }
  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${AppConstants.API_URL}reclamations/download/${id}`, {
      responseType: 'blob'
    });
  }
}
