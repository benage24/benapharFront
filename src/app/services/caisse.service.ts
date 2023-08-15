import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

 
  constructor(
    private http: HttpClient,
    private router: Router,
    
) {
    // super(http, `${environment.baseUrl}/product`);
}



getReport(): Observable<any> {
  const url = `${environment.baseUrl}/caisse/report`;
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

getExpenset(): Observable<any> {
  const url = `${environment.baseUrl}/caisse/expense/list`;
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


getSales(): Observable<any> {
  const url = `${environment.baseUrl}/caisse/sales/list`;
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

// saveProduct(data:any): Observable<any> {
//   const url = `${environment.baseUrl}/product/create/`;
//   return this.http.post(url,data).pipe(
//     catchError(error => {
//         if (error.status === 401) {
//           // Redirect to login page if session expired
//           this.router.navigate(['/login']);
//         }
//         return throwError(error);
//       })
//   );

  
// }

// deleteProduct(id: number): Observable<any> {
//   const url = `${environment.baseUrl}/product/delete/${id}`;
//   return this.http.delete(url).pipe(
//     catchError(error => {
//       if (error.status === 401) {
//         this.router.navigate(['/login']);
//       }
//       return throwError(error);
//     })
//   );
// }

// detailProduct(id: number): Observable<any> {
//   const url = `${environment.baseUrl}/product/${id}`;
//   return this.http.get(url).pipe(
//     catchError(error => {
//       if (error.status === 401) {
//         this.router.navigate(['/login']);
//       }
//       return throwError(error);
//     })
//   );
// }

// updateProduct(id: number, data: any): Observable<any> {
//   const url = `${environment.baseUrl}/product/update/${id}/`;
//   return this.http.put(url, data).pipe(
//     catchError(error => {
//       if (error.status === 401) {
//         this.router.navigate(['/login']);
//       }
//       return throwError(error);
//     })
//   );
// }
}
