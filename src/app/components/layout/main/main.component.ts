import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  toggledData:any
  constructor(

    private sharedService: SharedService
  ) {
    this.sharedService.data$.subscribe((data) => {
      this.toggledData = data;
      console.log("togglr home",this.toggledData);
      
    });
  }
  
}
