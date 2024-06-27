import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ComfirmationDialogComponent } from '../components/dialogs/comfirmation-dialog/comfirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openConfirmDialog(msg:string){
   return this.dialog.open(ComfirmationDialogComponent,{
      width:'690px',
      panelClass:"confirm-dialog-container",
      disableClose:true,
      data:{
        message:msg
      }
    })
  }
}
