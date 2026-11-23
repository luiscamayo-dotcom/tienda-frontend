import { Component, input, output } from '@angular/core';
import { CartItem } from '../../../../core/models/marketplace.model';

@Component({
  selector: 'app-cart-item-row',
  imports: [],
  templateUrl: './cart-item-row.html',
  styleUrl: './cart-item-row.css'
})
export class CartItemRow {
  // Recibe la línea del carrito y emite cambios para que la página los gestione.
  item = input.required<CartItem>();
  quantityChange = output<{ productId: number; quantity: number }>();
  remove = output<number>();
}