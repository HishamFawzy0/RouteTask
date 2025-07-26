import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/Product/product-service';
import { IProduct } from '../../shared/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  _productService: any = inject(ProductService);
  products: IProduct[] = [];

  searchTerm: string = '';
  sortOption: string = '';
  filteredProducts: IProduct[] = [];

  constructor() {
    // Constructor logic if needed
  }

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
}
 