import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  getCaisse(path:string): Observable<any> {
    const url = `${environment.baseUrl}/caisse/${path}`;
    return this.http.get(url).pipe(
      catchError(error => {
          if (error.status === 401) {
            // Redirect to login page if session expired
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
    );
  }
  
}
