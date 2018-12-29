import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { UserService, AuthenticationService  } from '../_services';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
      private authService: AuthenticationService) 
      {
          this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
              this.currentUser = user;
            });          
      }

   ngOnInit() {
        }   

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();

      }

}