import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { UserLogin } from 'src/app/entities/user-login';
import { AppFeeback } from 'src/app/enums/app-feedback.enum';
import { AppConfigService } from 'src/app/services/app.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppUtilitie } from 'src/app/utilities/app-utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

 //boolean
 passView: boolean = true;
 typing: boolean = true;
 typingPass: boolean = true;
 //objects
 userLogin: UserLogin = new UserLogin();
 userErrors: any = {};
 //any
 loginUrl: any;
 constructor(
  private dialog: MatDialog,
   private router: Router,
   private appConfig: AppConfigService,
   private authService: AuthenticationService,
   private activaterouter: ActivatedRoute
 ) {}

 ngOnInit(): void {

   this.loginUrl = this.activaterouter.snapshot.queryParamMap.get('returnto');
 }

 toggleView() {
   this.passView = !this.passView;
 }

//  async validateOrReject() {
//    try {
//      await validate(this.userLogin).then((errors) => {
//        if (Array.isArray(errors) && errors.length > 0) throw errors;
//      });

//      this.onConnexion();
//    } catch (errors) {
//      if (Array.isArray(errors)) {
//        errors.map((error: ValidationError) => {
//          this.userErrors[error.property] = error.constraints?.['isNotEmpty'];
//        });
//      } else {
//        AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
//      }
//    }
//  }

  //  login() {
  //   //  this.appConfig.onStartWaiting();
  //    this.authService.login(this.userLogin).subscribe({
  //      next: (res: any) => {
  //       console.log("access",res);
  //       // this.appConfig.setToconsole.log("access",res);ken(res);
  //       // if(res){
  //       //   this.appConfig.setToken(res);
  //       //   this.router.navigate(['/main/dashboard']);
  //       // }
  //       //  this.appConfig.onStopWaiting();
  //        if (res.status && res.status.code === 400) {
  //         console.log("work ERROR",res);
  //         this.appConfig.onConnected(res);
  //          this.router.navigate(['/main/dashboard']);
  //         //  AppUtilitie.openInfoDialog(this.dialog, res.status.message);
  //        } else if (this.loginUrl) {
  //          this.appConfig.onConnected(res);
           
           
  //          this.router.navigate(['/main/dashboard']);
  //          this.router.navigateByUrl(this.loginUrl);
  //        } else {
  //          this.appConfig.onConnected(res);
  //           this.router.navigate(['/main/dashboard']);
  //        }
  //      },
  //      error: (e) => {
  //       //  this.appConfig.onStopWaiting();
  //       //  AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
  //      },
  //    });
  //  }


   login() {
    this.appConfig.onStartWaiting();
    this.authService.login(this.userLogin).subscribe({
      next: (res: any) => {
        this.appConfig.onStopWaiting();
        this.appConfig.onConnected(res);
            this.router.navigate(['/main/dashboard']);
      },
      error: (e) => {
         this.appConfig.onStopWaiting();
        

        if (e.status === 400) {
          // Handle bad request
          AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);

          console.log('Bad request:', e.error); // Log the error details
          // Display an error message to the user
        } else if (e.status === 401) {
          // Handle unaith
          AppUtilitie.openInfoDialog(this.dialog,  AppFeeback.BAD_CREDENTIAL);
          console.log('Other error:', e.error);
          // Display a generic error message
        }else{
           // Handle other error
           console.log('Other error:', e.error);
           // Display a generic error message
        }
      },
    });

   
  }

}
