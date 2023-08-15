import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { AppFeeback } from "../enums/app-feedback.enum";
import { IRepository } from "../interfaces/repository.interface";

export abstract class Repository<T> implements IRepository<T>{
    
    constructor(
        protected readonly _http: HttpClient,
        protected readonly _base: string,
    ) {}
    
    find$(uri: string | undefined): Observable<T[] | T | any> {
        return this._http.get<T[] | T>(this._base + `/${uri}`)
        .pipe(
            map((res: any) => {
                if(res.statusCode == '400')
                    throw res.status.message;

                else if (res.statusCode == '500')
                    throw AppFeeback.NETWORK_ERROR;
                
                else if (res.statusCode == '401')
                    throw AppFeeback.SESSION_EXPIRED;

                return res.response;
            }),
            catchError(error => {
                if(typeof error !== 'string')
                    throw AppFeeback.NETWORK_ERROR;
                
                throw error
            })
        )
    }

    save$(data: T, uri?: string | undefined, ): Observable<T> {
        if(uri !== undefined){
            return this._http.post<T>(this._base + `/${uri}`, data)
            .pipe(
                map((res: any) => {
                    if(res.statusCode == '400')
                        throw res.status.message;
    
                    else if (res.statusCode == '500')
                        throw AppFeeback.NETWORK_ERROR;
                    
                    else if (res.status.code == '401')
                        throw AppFeeback.SESSION_EXPIRED;
    
                    return res.response;
                }),
                catchError(error => {
                    if(typeof error !== 'string')
                        throw AppFeeback.NETWORK_ERROR;
                    
                    throw error
                })
            )
         
        }
        return this._http.post<T>(this._base, data)
        .pipe(
            map((res: any) => {
                if(res.statusCode == '400')
                    throw res.message;

                else if (res.statusCode == '500')
                    throw AppFeeback.NETWORK_ERROR;
                
                else if (res.statusCode == '401')
                    throw AppFeeback.SESSION_EXPIRED;

                return res.response;
            }),
            catchError(error => {
                if(typeof error !== 'string')
                    throw AppFeeback.NETWORK_ERROR;
                
                throw error
            })
        )
    }
    
    update$(data: T, uri: string | undefined): Observable<T> {
        return this._http.put<T>(this._base + `/${uri}`, data)
        .pipe(
            map((res: any) => {
                if(res.statusCode == '400')
                    throw res.message;

                else if (res.status.code == '500')
                    throw AppFeeback.NETWORK_ERROR;
                
                else if (res.statusCode == '401')
                    throw AppFeeback.SESSION_EXPIRED;

                return res.response;
            }),
            catchError(error => {
                if(typeof error !== 'string')
                    throw AppFeeback.NETWORK_ERROR;
                
                throw error
            })
        )
    }
    
    delete$(uri: string | undefined): Observable<T> {
        return this._http.delete<T>(this._base + `/${uri}`)
        .pipe(
            map(res=>{
               return res 
            }),
            catchError(error=>{
               throw error;
            })
        );
    }

    patch$(data: T, uri: string | undefined): Observable<T> {
        return this._http.patch<T>(this._base + `/${uri}`, data)
        .pipe(
            map(res=>{
               return res 
            }),
            catchError(error=>{
               throw error;
            })
        );
    }
}