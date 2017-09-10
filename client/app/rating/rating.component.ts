import { Component, Input, Output, EventEmitter } from '@angular/core';

// TEMPLATE AND STYLES ARE PROVIDED INLINE HERE AS THIS COMPONENT IS USED FROM OTHER COMPONENTS ON DIFFERENT PATHS IN THE APPLICATION SO BY DOING THIS WE AVOID WORRYING ABOUT HTML AND CSS FILE PATHS
@Component({    
    selector: 'rating-component',
    template: `
	    <div class='crop'>
		    <div *ngFor='let index of range' class="rateStar">		        
				<h3 class='glyphicon' (click)='onClick(index)' [ngClass]="index <= rating ? 'glyphicon-star' : 'glyphicon-star-empty'"></h3>				
		    </div>
			<h3 class="rate pull-left">{{rating | number : '1.2-2'}}</h3>
		</div>
    `,
    styles: [`
		.crop {
		    overflow: hidden;
		    margin-left: 5px;
		}		 
		.rateStar {
		    cursor: pointer;
		}
		.glyphicon {
		    float: left;
			color: #FFC200;
		}
		.rate {
			color: #FFC200;
			margin-left: 15px;
			cursor: default;
		}
    `]
})

// Reusable component to handle video ratings (used in the list and detail components)
export class RatingComponent{	
	@Input() rating : number = 0;
	@Input() videoId : string;
	@Output() ratingClicked : EventEmitter<any> = new EventEmitter();
	private ratings: Array<number>	= [];
	private range: Array<number> = [1, 2, 3, 4, 5];

	onClick(value : number) : void {		
		this.rating = value;
		this.ratingClicked.emit({
			videoId: this.videoId,
			rating: this.rating
		});
	}
}