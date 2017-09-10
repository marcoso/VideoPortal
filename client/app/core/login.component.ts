import { Component, Input, Injectable } from '@angular/core';
import { Router, NavigationExtras }      from '@angular/router';

import { AppComponent } from '../app.component';
import { AuthService } from './auth-service';
import { LoginInfo } from './LoginInfo';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['./styles/login.component.css']
})

// Component used to handle Login functionality in the UI
@Injectable()
export class LoginComponent {		
	public loginMessage: string;
	private loginInfo = new LoginInfo('', '');	

	constructor(public authService: AuthService, public router: Router, private appComponent: AppComponent) {} 	  	

  	// Handler for login that delegate the call to perform login by the Authentication Service
  	login() {	  		
  		let encryptedPassword = this.getMD5EncryptedPassword(this.loginInfo.password);    	
    	this.setLoginMessage('You are being logged in ...');    	
    	this.authService.login(this.loginInfo.username, encryptedPassword).subscribe(info => {      		
      		if(info.status == 'success'){				
	        	// Get the redirect URL from our auth service, if no redirect has been set, use the default
	        	let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'videoList';	        					
			    this.appComponent.loadUserDisplayName();		    			    
				// Redirect the user
				this.router.navigate([redirect]);		      					
      		}else{
      			this.setLoginMessage('You were not able to login: ' + info.error);
      		}	      	
    	});
	}

	// Encryption method for MD5, receives the password provided by the user and returnes an MD5 encrypted string
	getMD5EncryptedPassword(password: string){
		return CryptoJS.MD5(password).toString();
	}

	// Handler for logout that delegate the call to perform logout by the Authentication Service
	logout() {
		this.authService.logout().subscribe(info => {
		// Send the user back to the login page after logout
		    this.router.navigateByUrl('/login');
		});		
	}	

	// Used to display a message to the user when logging in or when an error has ocurred
	setLoginMessage(error: string){
		this.loginMessage = error;
	}
}