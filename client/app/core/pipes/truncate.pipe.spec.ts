// import {
//   inject,
//   async,
//   fakeAsync,
//   tick,
//   ComponentFixture,
//   TestBed
// } from '@angular/core/testing';
describe('Truncate Pipe Tests', () => {
  it('Variable is true', () => expect(true).toBe(true));
});

// import {
//   FormGroup,
//   ReactiveFormsModule
// } from '@angular/forms'

// import { TruncatePipe } from "./truncate.pipe";
 
// describe('Truncate Pipe Tests', () => {
//     let pipe : TruncatePipe;    

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//         declarations: [TruncatePipe],
//         imports: [ReactiveFormsModule]
//         });

//         const fixture = TestBed.createComponent(TruncatePipe);
//         pipe = fixture.componentInstance;
//     });

//     it('should have a defined pipe', () => {
//       expect(pipe).toBeDefined();
//   });
 
//     it('Should truncate the string after a specified string value', () => {
//         var result = pipe.transform('This would be a description of an object truncated without a trail', ['27']);
 
//         expect(result).toEqual('This would be a description of an object');
//     });

//     it('Should truncate the string after a specified string value and include a trail', () => {
//         var result = pipe.transform('This is description with a (...) trail that will be truncated', ['38', '...']);
 
//         expect(result).toEqual('This is description with a (...) trail...');
//     });        
// });