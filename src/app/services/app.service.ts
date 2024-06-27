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
            // width:"50%",
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
    onConnected(login: any): boolean{
        if(!login)
            return false; 
        else{
            sessionStorage.setItem('modules', JSON.stringify(login.module));
            sessionStorage.setItem('user', JSON.stringify(login.user));
            sessionStorage.setItem('access', login.access);
            sessionStorage.setItem('module', login.module);
            sessionStorage.setItem('role', login.role);
            sessionStorage.setItem('privilege', login.module_privileges);
        
            
            
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
      
        
        if(response)
            return response;

        return null;
    }


    // roles(role:string){
    //     let session: string | null = this.getItemFromSessionStorage("role");
       
  
    //     if(!session)
    //         return false
  
        
    //     if (role === session) {
    //         console.log("work");
    //         return true;
    //     } else {
    //         return false;
    //     }
        
    //     // if (role === session)
    //     //     console.log("work")
    //     //     return true;
        
    //     // for (const moduleAccess of roles) {
    //     //     console.log("yyyyyyy    ",moduleAccess);
            
    //     //     if (role == moduleAccess)
    //     //         return true;
    //     // }
  
        
  
    //    return false

    // }

    // roles(role:string){
    //     let session: string | null = this.getItemFromSessionStorage("role");
    //     if(!session)
    //         return false
    //     role === session;
    //     if (role === session) {
    //         console.log("work");
    //         return true;
    //     }
    //     return false
    // }

    roles(role:string){
        let session: string | null = this.getItemFromSessionStorage("role");
        if(!session)
            return false
        return role === session;
    }


    controlAccessModuleRoleAndPrivilege(role:string,module:string,privileges:string){
        let session: string | null = this.getItemFromSessionStorage("role");
        let sessionModule: string | null = this.getItemFromSessionStorage("module");
        let sessionPrivilege: string | null = this.getItemFromSessionStorage("privileges");
        if(!session || !sessionModule || !sessionPrivilege)
            return false
        return role === session && module===sessionModule && privileges===sessionPrivilege ;
    }

     controlAccessModuleAndPrivileges(module:string,privileges:string){
 
        let sessionModule = this.getItemFromSessionStorage("module");
        let sessionPrivileges = this.getItemFromSessionStorage("privilege");

       
        if (!sessionModule || !sessionPrivileges)
            return false;
        
        return sessionPrivileges.includes(privileges) && sessionModule===module
        
    }

    controlAccessModuleAndPrivilege(role: string, privilege: string){
        if(!role || role.length <= 0)
            return false
  
        if(!privilege || privilege.length <= 0)
            return false
  
        let session: string | null = this.getItemFromSessionStorage("role");
        // console.log("roles",session)
        let roles: any[] = new Array();
  
        // if(!session)
        //     return false
  
        // roles = JSON.parse(session);
  
        // for (const moduleAccess of roles) {
        //     if (role == moduleAccess.moduleName && moduleAccess.privileges.includes(privilege))
        //         return true;
        // }
  
        return false;
    }
  
  
    controlAccessModuleAndRole(module: string, role: string){
      if(!module || module.length <= 0)
          return false
  
      if(!role || role.length <= 0)
          return false
  
      let session: string | null = this.getItemFromSessionStorage("module");
    
      let modules: any[] = new Array();
  
      if(!session)
          return false
  
      modules = JSON.parse(session);
  
      for (const moduleAccess of modules) {
          if (module == moduleAccess.moduleName && moduleAccess.privileges.includes(role))
              return true;
      }
  
      return false;
  }
}
