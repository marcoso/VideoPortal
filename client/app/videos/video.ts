// Container for handle video data through components so the data can be used on two way binding
export class Video {	
	public totalRating? : number;	
	constructor(
	  public id: string,
	  public name: string,
	  public description: string,
	  public url: string,	  
	  public ratings?: Array<number>	  
	  ) { 		  	
			this.calculateRating();
	  }

	  public calculateRating(rate? : number) : number {
			if(this.ratings !== undefined){
				this.totalRating = this.ratings.reduce(function(a, b) {
					return a + b;
				}, rate ? rate : 0) / this.ratings.length;				
			}		
			return this.totalRating;
	  }
}