import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../iproduct';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: IProduct[], search: string): IProduct[] {
    if (!products) return [];
    if (!search) return products;

    const term = search.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(term));
  }
}
