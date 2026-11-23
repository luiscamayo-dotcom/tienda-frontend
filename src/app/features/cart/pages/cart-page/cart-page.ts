import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart';
import { OrderService } from '../../../../core/services/order';
import { Order } from '../../../../core/models/marketplace.model';
import { CartItemRow } from '../../components/cart-item-row/cart-item-row';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, ReactiveFormsModule, CartItemRow],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPage {
  // Servicios que gestionan el carrito y el registro de pedidos.
  private readonly fb = inject(FormBuilder);
  private readonly orderService = inject(OrderService);
  readonly cartService = inject(CartService);

  // Estado de envío y resultado que controla las respuestas visibles en la página.
  isSubmitting = signal(false);
  submitError = signal<string | null>(null);
  confirmedOrder = signal<Order | null>(null);

  // Datos de entrega con validaciones para aceptar una confirmación.
  deliveryForm = this.fb.nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]]
  });

  hasError(field: 'customerName' | 'address' | 'phone', errorCode: string): boolean {
    const control = this.deliveryForm.get(field);
    return Boolean(control && control.invalid && (control.dirty || control.touched) && control.hasError(errorCode));
  }

  onUpdateQuantity(event: { productId: number; quantity: number }): void {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  confirmOrder(): void {
    // Revisa el formulario y el contenido antes de crear el pedido.
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    if (this.cartService.items().length === 0) {
      this.submitError.set('No puedes confirmar un pedido con el carrito vacío.');
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    setTimeout(() => {
      const { customerName, address } = this.deliveryForm.getRawValue();
      const created = this.orderService.createOrder(
        customerName.trim(),
        address.trim(),
        this.cartService.items(),
        this.cartService.totalAmount()
      );

      this.cartService.clearCart();
      this.deliveryForm.reset();
      this.confirmedOrder.set(created);
      this.isSubmitting.set(false);
    }, 500);
  }
}