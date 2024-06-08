import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductForm, Product } from '../../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';
  http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  createProduct(data: ProductForm) {
    return this.http.post(this.apiUrl, data);
  }

  editProduct(id: string, data: ProductForm) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getProductDetail(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
