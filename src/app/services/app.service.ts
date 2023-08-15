import { Injectable } from "@angular/core";
// import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
// import { LoadingComponent } from "../components/dialogs/utilities/loading-component/loading-component.component";
import { LoginResponse } from "../entities/login-response";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LoadingComponent } from "../components/dialogs/loading/loading.component";

@Injectable({
    providedIn: 'root',
})

export class AppConfigService{

    private dialogRef: MatDialogRef<LoadingComponent> | undefined;
    private waiting$: Subject<boolean> = new Subject<boolean>();

    constructor(
         private dialog: MatDialog,
    ){}

    onStartWaiting(message?: string){
        
        
        this.waiting$.next(true);
        if(this.dialogRef){
            this.dialogRef.close()

        }
        this.dialogRef = this.dialog.open(LoadingComponent, {
            // id: 'loading-component',
            disableClose: true,
            data: {
                message: message,
            }
        })
    }

    setToken(login: LoginResponse) {
       

        if(!login)
        return false;
    else{
        sessionStorage.setItem('access', login.refresh);
        sessionStorage.setItem('access', login.access);
        // console.log( 'refreshssssssss', login)
        return true;
    }
      }
    onConnected(login: LoginResponse): boolean{
        if(!login)
            return false;
        else{
            sessionStorage.setItem('modules', JSON.stringify(login.moduleRoleResponses));
            sessionStorage.setItem('user', JSON.stringify(login.user));
            sessionStorage.setItem('access', login.access);
            // console.log( 'refre', login)
            return true;
        }
    }

    onDisconnect(){
        sessionStorage.clear();
    }

    onStopWaiting(){
        
        if (this.dialogRef) this.dialogRef.close()
    }
    get token(){
        return sessionStorage.getItem('access')
    }
    getItemFromSessionStorage(item: string){
        const response = sessionStorage.getItem(item);
        // console.log("respot",response);
        
        if(response)
            return response;

        return null;
    }
}
