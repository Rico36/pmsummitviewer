import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PMSummitViewer';
  currentUser: User;
  currentUserSubscription: Subscription;
  user: User;

  constructor(  private router: Router,
                public authService: AuthenticationService) 
     {
          this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
              this.currentUser = user;
            });
            
      }
    
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
        }

}