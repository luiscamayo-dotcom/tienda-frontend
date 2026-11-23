import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../models/marketplace.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);

  readonly items = this.cartItems.asReadonly();

  readonly totalItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly totalAmount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  addItem(product: Product, quantity = 1): void {
    if (product.stock <= 0 || quantity <= 0) return;

    this.cartItems.update((current) => {
      const existingIndex = current.findIndex((item) => item.product.id === product.id);

      if (existingIndex === -1) {
        const safeQty = Math.min(quantity, product.stock);
        return [...current, { product, quantity: safeQty }];
      }

      return current.map((item, index) => {
        if (index !== existingIndex) return item;
        const nextQty = Math.min(item.quantity + quantity, product.stock);
        return { ...item, quantity: nextQty };
      });
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this.cartItems.update((current) =>
      current.map((item) => {
        if (item.product.id !== productId) return item;
        const safeQty = Math.min(quantity, item.product.stock);
        return { ...item, quantity: safeQty };
      })
    );
  }

  removeItem(productId: number): void {
    this.cartItems.update((current) =>
      current.filter((item) => item.product.id !== productId)
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}