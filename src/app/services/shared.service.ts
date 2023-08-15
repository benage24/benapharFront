import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  emitData(data: any) {
    this.dataSubject.next(data);
  }

}
