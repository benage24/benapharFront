import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelReaderService {

  constructor() { }


  readExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
        const sheetName: string = workbook.SheetNames[0];
        const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        resolve(jsonData);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  }
  readExcels(file: File, sheetName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
  
        const selectedSheet = workbook.SheetNames.find((name) => name === sheetName);
        console.log("sheetnam",selectedSheet);
        
  
        if (!selectedSheet) {
          reject('Sheet not found in the Excel file.');
          return;
        }
  
        const sheet: XLSX.WorkSheet = workbook.Sheets[selectedSheet];

        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        resolve(jsonData);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsBinaryString(file);
    });
  }
  

  readExcelss(file: File): Promise<{ sheetNames: string[]; data: { [sheet: string]: any[] } }> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

        const sheetNames: string[] = workbook.SheetNames;

        const excelData: { [sheet: string]: any[] } = {};

        sheetNames.forEach((sheetName) => {
          const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
          const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          excelData[sheetName] = jsonData;
        });

        resolve({ sheetNames, data: excelData });
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  }



  getExcelBySheetName(file: File, sheetName: string): Promise<{ sheetNames: string[]; data: { [sheet: string]: any[] } }> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
  
        const sheetNames: string[] = workbook.SheetNames;
  
        const excelData: { [sheet: string]: any[] } = {};
  
        sheetNames.forEach((name) => {
          const sheet: XLSX.WorkSheet = workbook.Sheets[name];
          const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          excelData[name] = jsonData;
        });
  
        // Resolve data for the specified sheet
        if (sheetNames.includes(sheetName)) {
          resolve({ sheetNames, data: { [sheetName]: excelData[sheetName] } });
        } else {
          reject('Sheet not found in the Excel file.');
        }
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsBinaryString(file);
    });
  }
  
  
}
