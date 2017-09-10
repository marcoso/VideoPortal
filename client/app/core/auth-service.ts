import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { LoginInfo } from './LoginInfo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

// This Service is used for all the operations regarding authentication
@Injectable()
export class AuthService {  

  // Store the URL so we can redirect after logging in
  public redirectUrl : string;  
  // API Urls to perform Login/Logout
  private authenticationUrl = 'http://localhost:3000/user/auth';
  private authenticationLogoutUrl = 'http://localhost:3000/user/logout';

  constructor(private router: Router, private http: Http) {}
    
  // API Call to login the user
  login(user: string, encryptedPassword: string): Observable<any> {                
    let headers = new Headers({ 'Content-Type': 'application/json' }); 
    let options = new RequestOptions({ headers: headers });       
    return this.http
      .post(
        this.authenticationUrl, 
        JSON.stringify({ username : user, password: encryptedPassword }), 
        options
      )
      .map(this.extractData)
      .catch(this.handleError);    
  }

  // Handler to set session data after the user has been logged in
  private extractData(res: Response) {    
    let body = res.json();
    if (body.status == 'success') {        
        sessionStorage.setItem('session', body.sessionId);        
        sessionStorage.setItem('username', body.username);        
    }       
    return body || { };
  }
    
  // API Call to logout the user
  logout(): Observable<any> {   
    let headers = new Headers({ 'Content-Type': 'application/json' }); 
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('sessionId', sessionStorage.getItem('session'));    
    let options = new RequestOptions({ headers: headers, search: params });        

    return this.http.get(
      this.authenticationLogoutUrl, 
      options)
      .map(this.clearSession)
      .catch(this.handleError);   
  }

  // Handler to clear session data after the user has been logged out
  clearSession(res: Response){    
    if (res.status) {
      sessionStorage.removeItem('session'); 
      sessionStorage.removeItem('username');       
    }
  }

  // Check whether the user is logged in or not
  isLoggedIn() {        
    return !!sessionStorage.getItem('session');
  }

  private handleError (error: Response | any) {     
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }  
}