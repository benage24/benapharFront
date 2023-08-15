import { Component } from '@angular/core';
import { ProductService } from './services/product-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'benapharFront';
  product:any

  constructor( private productService:ProductService){
   
  }
 
  ngOnInit(): void {
   

  }

 
  }

