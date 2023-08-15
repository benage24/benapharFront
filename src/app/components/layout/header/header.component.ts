import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user:any
  constructor(private router: Router, private appConfig: AppConfigService) {
    this.user = this.appConfig.getItemFromSessionStorage('user');
  }
  ngOnInit(): void {
    this.user = JSON.parse(this.user);
  }

}
