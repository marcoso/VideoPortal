import { Component, Input, OnInit, OnDestroy, Injectable, trigger, state, style, transition, animate, Directive } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { AppComponent } from '../app.component';
import { RatingService } from '../rating/rating-service';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Video } from './video';

// This component handle the video detail and animations for details page
@Component({
  selector: 'video-detail',
  templateUrl: 'video-detail.component.html',
  styleUrls: ['./styles/video-detail.component.css'],
  animations: [
    trigger('resizeAnimation', [
      state('inactive', style({        
        transform: 'scale(0)'
      })),
      state('active',   style({        
        transform: 'scale(1)'
      })),
      transition('active => inactive', animate('200ms ease-in')),
      transition('inactive => active', animate('200ms ease-out'))
    ])
  ]  
})

@Injectable()
export class VideoDetailComponent implements OnInit, OnDestroy {			  	
  	private videos : Video[]; 
  	private triggerAnimation : string = 'inactive';
  	private singleVideoUrl = 'http://localhost:3000/video';  	

	constructor(private http: Http, private route: ActivatedRoute, private appComponent: AppComponent, private rateService: RatingService) {}	

  	ngOnInit() {  		
  		this.loadVideo();  		
  	}

  	ngOnDestroy() {  		
  		// Setting of animation states to default values
  		this.loadAnimation();
  	}  	

  	// Performs a change in the state values that will trigger animation when entering or leaving the page
  	loadAnimation(){
  		this.triggerAnimation = this.triggerAnimation == 'inactive' ? 'active' : 'inactive';	
  	}  	

  	// Handles REST call to load the video data to be displayed in detail
  	loadVideo() {      		
		let headers = new Headers({ 'Content-Type': 'application/json' }); 
		let params: URLSearchParams = new URLSearchParams(); 
		params.set('sessionId', sessionStorage.getItem('session'));    
		params.set('videoId', this.route.snapshot.params['id']);    
		let options = new RequestOptions({ headers: headers, search: params });        

		this.http.get(this.singleVideoUrl, options)
			.map(this.videoLoaded)
			.catch(this.handleError)
			.subscribe(video => { 
			this.videos = video; 
			this.loadAnimation();
			});      
	}  	

	// Handler to map the video after the REST call has been executed
	videoLoaded(response: Response){						
		if(response){   		  
			let obj = response.json();		  
			let results = <Video[]>[];
			let loadedVideo = new Video(obj.data._id, obj.data.name, obj.data.description, obj.data.url, obj.data.ratings);				
			loadedVideo.calculateRating();
			results.push(loadedVideo);                				
			return results;
		}else{
			throw new Error('An error ocurred with the request, the response status is: ' + response.statusText);
		} 
	}

	onRating(obj: any):void {      
		var videoFiltered = this.videos.filter((item: any) => item.id === obj.videoId);
		if (!!videoFiltered && videoFiltered.length === 1) {          
			var video : Video = <Video> videoFiltered[0];          
			this.rateService.rate(video.id, obj.rating.toString())
			.subscribe(rawVideo => { 																	
				// Update rating to video so it is refreshed in the UI          
				video.ratings = rawVideo.data.ratings;				
				video.calculateRating();
			});
		}
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
		return Observable.throw(errMsg);
	} 
}