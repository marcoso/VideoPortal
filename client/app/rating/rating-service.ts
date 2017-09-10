import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Video } from '../videos/Video';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

// This Service is used for rating operations on videos
@Injectable()
export class RatingService {
  // API Urls to perform Login/Logout
  private rateVideoUrl = 'http://localhost:3000/video/ratings';  

  constructor(private http: Http) {}
    
  // API Call to rate the video
  rate(id : string, rate: string) : Observable<any> {    
    let headers = new Headers({ 'Content-Type': 'application/json' });    
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('sessionId', sessionStorage.getItem('session'));    
    let options = new RequestOptions({ headers: headers, search: params });    
    return this.http.post(
        this.rateVideoUrl, 
        JSON.stringify({ videoId : id, rating : rate }), 
        options)
      .map(this.extractData)
      .catch(this.handleError);    
  }

  // Handler to set video data after the rating has taken place
  private extractData(res: Response) {        
    let body = res.json();
    if (body.status == 'success') {      
        let video = body.data;     
        //In case any extra operation is needed on the video it can be done here     
    }       
    return body || { };
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