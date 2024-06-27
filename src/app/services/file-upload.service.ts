import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  
  constructor(
    private http:HttpClient,
    private router: Router) { 
    
  }

  UploadFile(data:any): Observable<any>{
    const url=`${environment.baseUrl}/file/upload/`;
    const formData:FormData = new FormData()
    formData.append('file',data,data.name)
    return this.http.post(url,formData).pipe(
      catchError(error=>{
        if(error.status === 401){
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    )
  }
}
