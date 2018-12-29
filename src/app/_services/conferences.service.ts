import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Conference {
    id: number | string;
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    room: string;
    imgUrl: string;
    speakerName: string;
    folderUrl: string;
    description: string;
}

@Injectable()
export class ConferenceService {
  Conferences: Observable<Conference[]>
  private _Conferences: BehaviorSubject<Conference[]>;
  private _conference: BehaviorSubject<Conference> = new BehaviorSubject<Conference>(null); // = new Subject<IEvent>();
  private baseUrl: string;
  private dataStore: {
    Conferences: Conference[]
  };

  constructor(private http: HttpClient) {
    this.baseUrl = '/assets/sessions.json';
    this.dataStore = { Conferences: [] };
    this._Conferences = <BehaviorSubject<Conference[]>>new BehaviorSubject([]);
    this.Conferences = this._Conferences.asObservable();
  }

  loadAll() {
    this.http.get<Conference[]>( this.baseUrl).subscribe(data => {
      /* load all the items of the JSON file into memory */
      this.dataStore.Conferences = data;
      /* trigger a notification to all subscribers of this data */
      this._Conferences.next(Object.assign({}, this.dataStore).Conferences);
    }, error => console.log('Could not load events sessions.'));
  }

  public load(EventId: number | string): Observable<Conference> { 
    /* find the JSON data row with ID= EventID from the existing memory array @ Conferences. 
       this will also notify subscribers of this function */
    return this.Conferences.pipe(
        map(conferences => conferences.find(item => item.id == EventId )))
      
  }
 }
