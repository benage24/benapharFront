import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comfirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comfirmation-dialog.component.html',
  styleUrls: ['./comfirmation-dialog.component.scss']
})
export class ComfirmationDialogComponent {
  isTrue:boolean=true
  isFalse:boolean=false
  sharedData = true;

  constructor(

    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ComfirmationDialogComponent>
  ) { }

  ngOnInit(): void {
  }
  closeYes(){
    this.dialogRef.close(true);
  }
  closeNo(){
    this.dialogRef.close(false);
  }

}
