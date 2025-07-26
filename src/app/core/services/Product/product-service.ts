import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../../shared/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http:HttpClient=inject(HttpClient);

  getProducts():Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
  }
  
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
  }
}
