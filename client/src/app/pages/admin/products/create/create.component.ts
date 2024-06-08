import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class ProductCreateComponent {
  categories: Category[] = [];
  productService = inject(ProductService);
  router = inject(Router);
  messageService = inject(MessageService);
  categoryService = inject(CategoryService);

  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true),
    startAt: new FormControl(''),
    bidTime: new FormControl(''),
  });

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  handleCreateProduct() {
    console.log(this.addProductForm.value);
    this.productService
      .createProduct({ ...this.addProductForm.value, endAt: new Date() })
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/products/list'])
          Swal.fire({
            title: "Success!",
            text: "Them Pham Thanh Cong.",
            icon: "success",
            showConfirmButton: false,
            timer: 1100
          });
        },
        error: (error) => {
          Swal.fire({
            title: "Them san pham Thất Bại!",
            text: error.message,
            icon: "error"
          });
        },
      });
  }
}
