import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpenseAdd } from 'src/app/entities/expense-add';
import { CaisseService } from 'src/app/services/caisse.service';
import { AppConfigService } from 'src/app/services/app.service';
import { AppFeeback } from 'src/app/enums/app-feedback.enum';
import { AppUtilitie } from 'src/app/utilities/app-utility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent {
  isVisible: boolean[] = [false];
  expenseForm!:FormGroup
  expense:ExpenseAdd=new ExpenseAdd()

  constructor(private formBuilder:FormBuilder,  
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private caiseService:CaisseService,
    private appConfig: AppConfigService,
    private router: Router,
    public dialog: MatDialog,
    ) {
  }
  ngOnInit(): void {
   

  
    this.formCreate()

  }
  getAmountsControls(): AbstractControl[] {
    return (this.expenseForm.get('amounts') as FormArray).controls;
  }

  // createAmountsFormGroup(): FormGroup {
  //   return this.formBuilder.group({
  //     montant: new FormControl(""),
  //     description: new FormControl(""),
     
     
  //   });
  // }
  createAmountsFormGroup(): FormGroup {
    return this.formBuilder.group({
      montant: [0],
      description: [''],
     
     
    });
  }
  formCreate(){
    this.expenseForm=new FormGroup({
      date:new FormControl(""),
      // amounts:new FormArray([
      //  this. createAmountsFormGroup()
      // ]),
      amounts: this.formBuilder.array([
        this.createAmountsFormGroup() // Add any initial values you want for the amount form group
      ])
    })

  }
 
  addInput() {
    const amountsArray = this.expenseForm.controls["amounts"] as FormArray
    
    amountsArray.push(this.createAmountsFormGroup());
  }
  removeInput(index:number) {
    const amountsArray = this.expenseForm.get('amounts') as FormArray;
    amountsArray.removeAt(index)
  }


  onSubmit() {
    // const formValues = this.prizeForm.value;
    if (this.expenseForm.valid) {
      // The form is valid, proceed with the form submission logic
      const formValues = this.expenseForm.value;
      console.log(formValues);

      // Add your form submission logic here
    } else {
      // The form is not valid, you can display an error message or take any other action
      console.log('Form is not valid. Please fill in all required fields.');
    }
    //console.log(formValues);


  }

  saveExpense() {
    this.appConfig.onStartWaiting();
    const formValues = this.expenseForm.value;
    console.log("formValues",formValues);
    
    this.caiseService.saveExpense(formValues).subscribe({
      next: (res: any) => {
         this.appConfig.onStartWaiting();
        if (res.status == '400') {
           AppUtilitie.openInfoDialog(this.dialog, res.status.message);
        } else {
          this.router.navigate(
            ['main/caisse/expense'],
            { replaceUrl: true }
          );
          
           AppUtilitie.openInfoDialog(this.dialog, AppFeeback.SAVE_SUCCESS);
          this.expense = new ExpenseAdd();
        }
        // console.log("respoane",res)
      },
      error: (e:any) => {
         this.appConfig.onStopWaiting();
        AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
      },
    });
  }
  close() {
    this.dialogRef.close();
  }
}
