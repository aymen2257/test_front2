import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'login', {
      num: credentials.num,
      password: credentials.password
    }, httpOptions);
  }

  register(user: any): Observable<any> {
    // return this.http.post(AppConstants.AUTH_API + 'signup', {
    //   id:user.id,
    //   num: user.num,
    //   email: user.email,
    //   password: user.password,
    //   cin:user.cin,
    //   matchingPassword: user.matchingPassword,
    //   socialProvider: 'LOCAL',
    //   using2FA: user.using2FA,
    // }, httpOptions);
    return this.http.post(AppConstants.AUTH_API + 'signup', {
      id: user.id,
      num: user.num,
      email: user.email,
      password: user.password,
      cin: user.cin,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL',
      using2FA: user.using2FA
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(err => {
        // Handle the error and rethrow it for the component to catch
        return throwError(err);
      })
    );
  }


  changePassword(user:any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'changePassword', {
      num: user.num,
      password: user.password
    }, httpOptions);

  }

  findUserByEmailAndCin(user:any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'forgetPassword', {
      email: user.email,
      cin:user.cin
    }, httpOptions);

  }

  verify(credentials:any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'verify', credentials.code, {
    	  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    });
  }

  verify2(credentials:any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'verify2', credentials.code, {
    	  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    });
  }


  verifyToken(token:any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'token/verify', token, {
    	  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    });
  }

  resendToken(token:any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'token/resend', token, {
    	  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    });
  }
}
