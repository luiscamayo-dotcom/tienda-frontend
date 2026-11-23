import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product';
import { CartService } from '../../../../core/services/cart';
import { Product } from '../../../../core/models/marketplace.model';

@Component({
  selector: 'app-product-detail-page',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css'
})
export class ProductDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  product = signal<Product | undefined>(undefined);
  quantity = signal(1);
  addedFeedback = signal(false);

  ngOnInit(): void {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(idParam)) {
      this.product.set(this.productService.getProductById(idParam));
    }
  }

  changeQuantity(delta: number): void {
    const currentProduct = this.product();
    if (!currentProduct) return;

    const next = this.quantity() + delta;
    if (next >= 1 && next <= currentProduct.stock) {
      this.quantity.set(next);
    }
  }

  addToCart(): void {
    const currentProduct = this.product();
    if (!currentProduct || currentProduct.stock === 0) return;

    this.cartService.addItem(currentProduct, this.quantity());
    this.addedFeedback.set(true);
    setTimeout(() => this.addedFeedback.set(false), 3000);
  }
}