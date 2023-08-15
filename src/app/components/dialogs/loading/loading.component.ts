import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(
    private dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.stop) {
      this.dialogRef.close()
    }
  }


  ngOnInit(): void {
  }

}
