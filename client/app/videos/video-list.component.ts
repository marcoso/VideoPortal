import { Component, Input, OnInit, OnDestroy, Injectable, trigger, state, style, transition, animate, Directive } from '@angular/core';
import { Router, ActivatedRoute }     from '@angular/router';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { AppComponent } from '../app.component';
import { RatingService } from '../rating/rating-service';
import { Observable } from 'rxjs/Observable';
import { Video } from './video';

@Component({
  selector: 'video-list',   
  templateUrl: 'video-list.component.html',
  styleUrls: ['./styles/video-list.component.css'],
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

// Component used to load the list of videos
@Injectable()
export class VideoListComponent implements OnInit, OnDestroy {		    
  private videoListingsUrl = 'http://localhost:3000/videos';
  private videos : Video[] = []; 
  private errorMessage : string = ''; 
  private limit : number = 10;
  private skipRecords : number = 0;
  private triggerAnimation : string = 'inactive';

  constructor(
    private http: Http,
    private route: ActivatedRoute, 
    private router: Router,
    private appComponent: AppComponent,
    private rateService: RatingService) {              
  }

  // Initial loading of videos that will be loaded into the screen
  ngOnInit() {             
    this.loadAllVideos();    
  }

  ngOnDestroy() {  		
    // Setting of animation states to default values
    this.loadAnimation();
  }  	

  // Performs a change in the state values that will trigger animation when entering or leaving the page
  loadAnimation(){
    this.triggerAnimation = this.triggerAnimation == 'inactive' ? 'active' : 'inactive';	
  }  

  // Handler to navigate to details page after clicking or pressing a tile on devices
  tileClick(videoId : string){
    this.router.navigateByUrl('/videoDetail/' + videoId);
  }

  // Callback handler for scroll directive that will handle video lazy loading
  onScroll () {    
    this.loadAllVideos();
  }

  onPlay(obj: any){    
    //PAUSE ALL OTHER VIDEOS
  }

  // REST call that query videos in the db
  loadAllVideos() {    
    let headers = new Headers({ 'Content-Type': 'application/json' }); 
    let params: URLSearchParams = new URLSearchParams(); 
    let sessionId = sessionStorage.getItem('session');    
    
    params.set('sessionId', sessionId);     
    if(this.skipRecords > 0){
      params.set('skip', this.skipRecords.toString());    
    }    
    params.set('limit', this.limit.toString());    
    
    let options = new RequestOptions({ headers: headers, search: params });        

    this.http.get(this.videoListingsUrl, options)
      .map(this.videosLoaded)
      .catch(this.handleError)
      .subscribe(videos => {         
        //Here we update the current videos list to include the new ones returned from the REST call
        this.videos = this.videos.concat(videos);     
        this.skipRecords += this.limit;
        if(this.skipRecords == this.limit){
          this.loadAnimation();
        }        
      });      
  }

  // Promise handler to fetch all json data returned from the REST call
  videosLoaded(response: Response){    
    if(response){   
      let results = <Video[]>[];
      let obj = response.json();      
      obj.data.forEach( 
        function (video: any) {                           
            let loadedVideo = new Video(video._id, video.name, video.description, video.url, video.ratings);            
            loadedVideo.calculateRating();            
            results.push(loadedVideo);                
        }
      );
      return results;       
    }else{
      //If an error ocurrs in the REST call we throw an exception      
      throw new Error('An error ocurred with the request, the response status is: ' + response.statusText);
    } 
  }
  
  onRating(obj: any):void {      
      var videoFiltered = this.videos.filter((item: any) => item.id === obj.videoId);
      if (!!videoFiltered && videoFiltered.length === 1) {                    
          var video : Video = <Video> videoFiltered[0];          
          this.rateService.rate(
            video.id, obj.rating.toString())
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