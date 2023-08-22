import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user:any
  toggleValue:boolean=false
  value!: boolean;
  constructor(private router: Router, private appConfig: AppConfigService, private sharedService: SharedService,) {
    this.user = this.appConfig.getItemFromSessionStorage('user');
  }
  ngOnInit(): void {
    this.user = JSON.parse(this.user);
  }



  
 
  toggleMenu(){
  this.toggleValue=!this.toggleValue
  
  this.sharedService.emitData(this.toggleValue);
  console.log("rrrrrrrrrrr",this.toggleValue);
  }

  emitData() {
    this.value = !this.value;
    this.sharedService.emitData(this.value);
    console.log(this.value);
  }

}
