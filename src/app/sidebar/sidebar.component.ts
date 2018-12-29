import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLinkActive  } from '@angular/router';
import { AuthenticationService } from '../_services';
import { Subscription } from 'rxjs';
import { User } from '../_models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(  private router: Router,
                private authService: AuthenticationService ) 
     {
          this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
              this.currentUser = user;
            });
      }
    

    ngOnInit( ) {
      if (this.authService.isUserEmailLoggedIn) 
        this.router.navigate(['/home'])
    }
    

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
      }

}

