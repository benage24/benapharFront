import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app.service';

@Component({
  selector: 'app-caisses-module',
  templateUrl: './caisses-module.component.html',
  styleUrls: ['./caisses-module.component.scss']
})
export class CaissesModuleComponent {
  sessionPrivileges: string[] = ['add_dailysales', 'change_dailysales', 'delete_dailysales', 'view_dailysales'];


  constructor(
    public appConfig: AppConfigService,
    private route:ActivatedRoute,
    private router: Router,
  ) {
   }

  
}
