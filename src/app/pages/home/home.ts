import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/Product/product-service';
import { IProduct } from '../../shared/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 
  _productService:any=inject(ProductService);
  products: IProduct[] = [];
  constructor() {
    // Constructor logic if needed
  } 


   ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._productService.getProducts().subscribe({
      next: (res: IProduct[]) => {
        // console.log('Products fetched successfully:', res);
        this.products = res; 
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
   }

}
 