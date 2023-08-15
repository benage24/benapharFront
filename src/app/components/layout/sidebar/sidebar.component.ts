import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppConfigService } from 'src/app/services/app.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  toggleValue:any

  toggledData:any
    constructor(
      private appConfig: AppConfigService,
      private sharedService: SharedService,
      private router: Router,
    ) {
      this.sharedService.data$.subscribe((data) => {
        this.toggleValue = data;
        console.log("togglr sidebar",this.toggleValue);
        
      });
    }
  // toggleMenu(){
  // this.toggleValue=!this.toggleValue
  
  // this.sharedService.emitData(this.toggleValue);
  // console.log(this.toggleValue);
  // }

  logOut(): void {
    this.appConfig.onDisconnect();
    this.router.navigate(['/login']);
  }
  }
  

