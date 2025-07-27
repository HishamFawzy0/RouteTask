import { Component, inject } from '@angular/core';
import { IProduct } from '../../shared/iproduct';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/Product/product-service';
import { CommonModule } from '@angular/common';
import { IcartItem } from '../../shared/icart-item';
import Swal from 'sweetalert2';

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


    addToCart(product: IProduct) {
      const cart: IcartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
      const existingItem = cart.find((item) => item.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // SweetAlert notification
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart 🛒',
        text: `${product.title.split(' ')[0]} has been added to your cart!`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
      });
    }
}
