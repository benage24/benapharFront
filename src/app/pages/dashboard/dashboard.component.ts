import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelReaderService } from 'src/app/services/excel-reader.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ExcelFile } from 'src/app/entities/excel';
import { Router } from '@angular/router';
import { AppFeeback } from 'src/app/enums/app-feedback.enum';
import { AppConfigService } from 'src/app/services/app.service';
import { AppUtilitie } from 'src/app/utilities/app-utility';
import { CaisseReportComponent } from '../caisses/caisse-report/caisse-report.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,CaisseReportComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedFile!: File;
  dialogue!:any
  excelDatas!: any
  excelSheets: string[] = [];
  selectedSheet!: string;
  excelFileData:ExcelFile=new ExcelFile()
  excelData: { [sheet: string]: any[] } = {};
  data_to_save:any
  constructor(private excelReaderService: ExcelReaderService,
    private fileUpload:FileUploadService
    ,public dialog: MatDialog,
     private appConfig: AppConfigService, 
       private router: Router,
        
    ) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file name",this.selectedFile.name);
    
    this.readExcel()
    // this.uploadFile()
  }



  readExcels() {
  
    
    if (this.selectedFile && this.selectedSheet) {
      const sheetNames: string[] = [];
      if (!this.excelData[this.selectedSheet]) {
        this.excelData[this.selectedSheet] = [];
      }
  

      this.excelReaderService.readExcels(this.selectedFile, this.selectedSheet).then(
        (data) => {
          this.excelData[this.selectedSheet] = data;
          sheetNames.push(this.selectedSheet);

          this.excelSheets = sheetNames;
          console.log("data",this.excelSheets)
        },
        (error) => {
          console.error('Error reading Excel file:', error);
        }
      );
    }
  }

  // excel-reader.component.ts
// ...

// readExcel() {
//   if (this.selectedFile) {
//     this.excelReaderService.readExcelss(this.selectedFile).then(
//       ({ sheetNames, data }) => {
//         console.log('Sheet names:', sheetNames);
//         console.log('Excel data:', data);

//         // Update your component properties with the sheet names and data
//         this.excelSheets = sheetNames;
//         this.excelData = data;
//       },
//       (error) => {
//         console.error('Error reading Excel file:', error);
//       }
//     );
//   }
// }

// Assume you have a service called excelReaderService
// Make sure to inject the service in your component

readExcel() {
  if (this.selectedFile) {
    this.excelReaderService.readExcelss(this.selectedFile).then(
      ({ sheetNames, data }) => {
        console.log('Sheet names:', sheetNames);
        console.log('Excel data:', data);

        // Initialize an empty object to store the sheet data
        const sheet_data: { [key: string]: any[] } = {};

        // Loop through sheet names and fetch data for each sheet
        sheetNames.forEach((sheetName, index) => {
          this.excelReaderService.readExcels(this.selectedFile, sheetName).then(
            (sheetData) => {
              // Add the sheet data to the object with the sheet name as the key
              sheet_data[sheetName] = sheetData;

              // If this is the last sheet, update your component properties
              if (index === sheetNames.length - 1) {
                this.data_to_save = sheet_data;
                console.log("data to save",this.data_to_save);
                
              }
            },
            (error) => {
              console.error(`Error reading data for sheet ${sheetName}:`, error);
            }
          );
        });
      },
      (error) => {
        console.error('Error reading Excel file:', error);
      }
    );
  }
}

readExcelBySheetName() {
  if (this.selectedFile) {
    this.excelReaderService.getExcelBySheetName(this.selectedFile,this.selectedSheet).then(
      ({ sheetNames, data }) => {
        console.log('Sheet names:', sheetNames);
        console.log('Excel data:', data);

        // Update your component properties with the sheet names and data
        this.excelSheets = sheetNames;
        this.excelData = data;
      },
      (error) => {
        console.error('Error reading Excel file:', error);
      }
    );
  }
}
uploadFile(){
  console.log("file",this.selectedFile);
  
  if(this.selectedFile){
  // Create a FormData object to send the file
  const formData = new FormData();
  // formData.append('file', this.selectedFile, this.selectedFile.name);


   this.appConfig.onStartWaiting();
  
  this.fileUpload.UploadFile(this.selectedFile).subscribe({
    next: (res: any) => {
      this.appConfig.onStopWaiting();

      if (res.status === "400") {
        AppUtilitie.openInfoDialog(this.dialogue, res.status.message);
      } else {
        // this.router.navigate(['Accueil/Gestion_des_Agents/Enfants/liste']);
        AppUtilitie.openInfoDialog(this.dialogue, AppFeeback.SAVE_SUCCESS);
        this.excelFileData = new ExcelFile();
      }
    },
    error: (e: any) => {
      this.appConfig.onStopWaiting();
      AppUtilitie.openInfoDialog(this.dialogue, AppFeeback.NETWORK_ERROR);
    }
  });
}

}


}
