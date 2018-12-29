import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conference, ConferenceService } from '../_services';

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss'],

    // Add this:
    animations: [
      trigger('listStagger', [
        transition('* <=> *', [
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'translateY(-15px)' }),
              stagger(
                '100ms',
                animate(
                  '550ms ease-out',
                  style({ opacity: 1, transform: 'translateY(0px)' })
                )
              )
            ],
            { optional: true }
          ),
          query(':leave', animate('100ms', style({ opacity: 0 })), {
            optional: true
          })
        ])
      ])
    ]
  })

export class ConferencesComponent implements OnInit {

  conferences: Observable<Conference[]>;
  singleConference: Observable<Conference>;
  setOne: Observable<Conference[]>;
  setTwo: Observable<Conference[]>;

  constructor( private conferenceService:  ConferenceService ) {};

  ngOnInit() {
    this.conferences = this.conferenceService.Conferences
            .pipe(map(results => results.sort(this.sortByDateTime))
      );

    // split the list of sessions into two arrays each holding a day's session
    this.setOne = this.conferences.pipe(
      map(conferences => conferences.filter(item => item.date == '03/12/2019'))
    );

    this.setTwo = this.conferences.pipe(
      map(conferences => conferences.filter(item => item.date == '03/13/2019'))
    );

/*     this.singleConference = this.conferenceService.Conferences.pipe(
      map(conferences => conferences.find(item => item.id == '1'))
    ); 
    
*/

    this.conferenceService.loadAll();
   // this.conferenceService.load('1');
  }

  private sortByDateTime(a: Conference, b: Conference) {
   /* Note: the  .date field must be in mm/dd/yyyy or yyyy/mm/dd format  
             the .startTime must be in hh:mm[am/pm]  format   */
   
    var d1 = new Date(Date.parse(a.date + " " + a.startTime ));
    var d2 = new Date(Date.parse(b.date + " " + b.startTime ));

    if (d1 < d2)
        return -1;
    if (d1 > d2)
      return 1;
    return 0;
  }

private getMonthDayShort (date: string ) {
  var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var d = new Date(Date.parse(date));
  var dd = d.getDate();

  return (month_names_short[d.getMonth()] + " " + dd.toString() + " - ");
};

}
