import {Pipe, PipeTransform, Injectable} from '@angular/core'

@Pipe({
  name: 'truncate'
})

@Injectable()
// PIPE USED TO TRUNCATE STRINGS
export class TruncatePipe {
  transform(value: string, args: string[]) : string {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 30; // Limit where after that value the text will be truncated as per the first value in the array
    let trail = args.length > 1 ? args[1] : '...'; // Sets the mask that will be used at the end of the string

    return value.length > limit ? value.substring(0, limit) + trail : value;    
  }  
}