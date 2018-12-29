import { Component, OnInit } from '@angular/core';
//import { DataService } from '../data.service';
//import { IEvent } from '../events/IEvent';
import { Conference, ConferenceService } from '../_services';
import { Observable, Subscription, throwError  } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  //private Conference: Observable<Conference>;  // holds the Conference data
  public Conference: Conference;  // holds the Conference data which will be displayed in the HTML page
  private ID: any;
  subscription: Subscription;
 
 // constructor(private route: ActivatedRoute, private data: DataService ) { 
  constructor(private route: ActivatedRoute, private conferenceService:  ConferenceService ) { 
    /* get the "id" parameter passed for the selected Conference row */
    this.route.params.subscribe( params => this.ID = params.id);
  }

  ngOnInit() {

   /* Call the Conference data service passing the "id" of the Conference we want to display. 
      Data is loaded to the Conference variable for display.  Look in the .HTML file to see how it gets displayed.  */
    this.subscription =  this.conferenceService.load(this.ID).subscribe ( (data: Conference) => 
      this.Conference = data 
    );   
     
    console.log(this.Conference); 
  } 

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }    
}
