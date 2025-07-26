import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../iproduct';

@Pipe({
  name: 'productSortPipe',
})
export class ProductSortPipePipe implements PipeTransform {
  transform(products: IProduct[], sortOption: string): IProduct[] {
    if (!products) return [];

    const sorted = [...products];

    switch (sortOption) {
      case 'priceLowHigh':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceHighLow':
        return sorted.sort((a, b) => b.price - a.price);
      case 'nameAZ':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'nameZA':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }
}
