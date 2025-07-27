import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/Product/product-service';
import { IProduct } from '../../shared/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../../shared/pipes/product-filter-pipe';
import { ProductSortPipePipe } from '../../shared/pipes/product-sort-pipe-pipe';
import { IcartItem } from '../../shared/icart-item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, ProductFilterPipe, ProductSortPipePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  Math = Math;
  _productService: any = inject(ProductService);
  products: IProduct[] = [];

  searchTerm: string = '';
  sortOption: string = '';
  filteredProducts: IProduct[] = [];

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (res: IProduct[]) => {
        this.products = res;
        this.applyFilters();
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  applyFilters() {
    let filtered = [...this.products];

    // Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(term));
    }

    // Sort
    switch (this.sortOption) {
      case 'priceLowHigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.filteredProducts = filtered;
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
 