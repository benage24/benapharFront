import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

import { Repository } from '../repository/repository';
import { Router } from '@angular/router';
import { Product } from '../entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Repository<Product> {

  constructor(
    protected override _http: HttpClient,
    protected _router: Router,
    //  protected override _dialog: MatDialog
  ){
    super(_http,`${environment.baseUrl}/product`)
  }
}
