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
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(AppConstants.API_URL+"listeUsers", httpOptions);
  }

  changeImage(fileImage:File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileImage', fileImage);
    return this.http.put(AppConstants.API_URL + 'changeImage', formData, {
      responseType: 'json'  // Specify that the response is expected to be in JSON format
    });
  }

  changePwd(pwd:any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('pwd', pwd);
    return this.http.put(AppConstants.API_URL + 'changePwd', formData, {
      responseType: 'json'  // Specify that the response is expected to be in JSON format
    });
  }

  changeData(name:any,address:any,email:any,sex:any,date:any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('sex', sex);
    formData.append('date', date);
    return this.http.put(AppConstants.API_URL + 'changeData', formData, {
      responseType: 'json'  // Specify that the response is expected to be in JSON format
    });
  }

  getUserById(id:any): Observable<any> {
    return this.http.get(AppConstants.API_URL + `getUserById/${id}`, httpOptions);
  }





}
