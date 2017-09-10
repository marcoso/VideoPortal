import { Component, Input, trigger, state, style, transition, animate, OnInit } from '@angular/core';
import { Router }      from '@angular/router';

import { Video } from './videos/video';
import { AuthService } from './core/auth-service';

import * as CryptoJS from 'crypto-js';

// Main component of our application mainly used with login/logout operations, also provides animations for login/logout to display user info on screen
@Component({
	selector: 'my-app',  
	templateUrl: './app/app.component.html',
	styleUrls: ['./app/styles/app.component.css'],
	animations: [
    trigger('resizeAnimation', [
      state('inactive', style({        
        transform: 'scale(0)'
      })),
      state('active',   style({        
        transform: 'scale(1.1)'
      })),
      transition('active => inactive', animate('200ms ease-out')),
      transition('inactive => active', animate('200ms ease-in'))
    ])
  ]
})
export class AppComponent {   	      	
	public userDisplayName : string;
	public triggerAnimation : string = 'active';
    constructor(public authService: AuthService, public router: Router){}    

    // Handler for logout that delegate the call to perform logout by the Authentication Service
	logout() {
		this.authService.logout().subscribe(info => {			
			this.loadUserDisplayName();			
			// Send the user back to the login page after logout
		    this.router.navigateByUrl('/login');
		});		
	}

	// Set animation states to animations to be triggered when login/logout and also sets user data to screen
	loadUserDisplayName(){
		this.userDisplayName = sessionStorage.getItem('username') != null ? 'Welcome ' + sessionStorage.getItem('username') : 'Welcome, please log in.';     
		this.triggerAnimation = this.triggerAnimation == 'inactive' ? 'active' : 'inactive';
	}

	ngOnInit(): void {
		this.loadUserDisplayName();		
	}
}