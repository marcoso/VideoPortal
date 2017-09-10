import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable()
export class AuthGuard implements CanActivate {  

  constructor(private authService: AuthService, private router: Router) {}

  // Handler that checks if the user has access to the requested route component
  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
  canActivate(): boolean {            
    return this.checkLogin();    
  }

  checkLogin(): boolean {  	    
    if (this.authService.isLoggedIn()) { return true; }   
    // Store the attempted URL for redirecting    
    this.router.navigateByUrl('/login');
    return false;
  }
}