import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfigService } from "../services/app.service";

@Injectable({
    providedIn:'root'
})
export class TokenInterceptor implements HttpInterceptor{
    
    constructor(private appConfig: AppConfigService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

         const token=this.appConfig.getItemFromSessionStorage("access");
        // const tokens=this.appConfig.token();
        const url=req.url
        // console.log("log",token);
        
        const TokenizeRequest=req.clone({
          setHeaders:{
            Authorization:`Bearer ${token}`
          }
        })
        if(req.url.includes('login')){
            return next.handle(req)
        }


        return next.handle(TokenizeRequest);
    }
}

export const TokenInterceptorProvider = {
  provide:HTTP_INTERCEPTORS,
  multi:true,
  useClass:TokenInterceptor
}