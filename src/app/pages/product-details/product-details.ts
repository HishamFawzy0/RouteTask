import { Component, inject } from '@angular/core';
import { IProduct } from '../../shared/iproduct';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/Product/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product!: IProduct;
  isLoading = true;
  Math = Math;
 
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
