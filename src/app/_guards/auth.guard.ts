import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isUserEmailLoggedIn) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page but pass the return url to eventually send the user to the desired page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}