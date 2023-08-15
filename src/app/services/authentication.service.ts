import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../entities/user-login';
import { HttpDataResponse } from '../utilities/http-data-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    protected readonly _http: HttpClient,
  ) { }

  public login(user: UserLogin): Observable<HttpDataResponse<UserLogin>>{
    return this._http.post<HttpDataResponse<any>>(`${environment.baseUrl}/user/login/`, user)
}

}
