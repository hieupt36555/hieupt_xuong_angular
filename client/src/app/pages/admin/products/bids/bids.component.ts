import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { BidService } from '../../../../services/bid.service';
import { Product } from '../../../../../types/Product';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.css'
})
export class BidsComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidService);

  product!: Product;


  bidPriceMax: number = 0;

  productId!: string;
  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;

      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  handleBidWin(id: string){
    this.bidService.updateBid(id, true).subscribe({
      next: () => {
        this.getProductDetail(this.productId);
        Swal.fire({
          title: "Success!",
          text: "Thanh Cong!.",
          icon: "success",
          showConfirmButton: false,
          timer: 1100
        });
      },
      error: (error) => {
        console.error(error);
      },
    })
  }

}
