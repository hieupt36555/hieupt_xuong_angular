import { Component, inject } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../services/product.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
  handleDeleteProduct(id: string) {
    Swal.fire({
      title: "Bạn Có Muốn Xóa Vĩnh Viễn Sản Phẩm Này?",
      // text: "Bạn Sẽ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa Vĩnh Viễn !"
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.products = this.products.filter((product) => product._id !== id);
              Swal.fire({
                icon: "success",
                title: "Đã Xóa Thành Công!",
                showConfirmButton: false,
                timer: 1100
              });
            },
            error: (error) => {
              Swal.fire({
                title: "Xóa Thất Bại!",
                text: error.message,
                icon: "error"
              });
            },
          });
        }
      });
  }

}
