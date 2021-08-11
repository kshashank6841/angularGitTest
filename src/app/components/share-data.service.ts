import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private _subjectData = new BehaviorSubject<any>("Default Message");
  emit<T>(data: T)
  {
    this._subjectData.next(data);
   
  }
  on<T>(): Observable<T>
  {
    return this._subjectData.asObservable();
  }
 
  constructor() { }
}
