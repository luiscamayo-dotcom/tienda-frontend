import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/marketplace.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  // Recibe el producto que representa y emite la solicitud de agregarlo al carrito.
  product = input.required<Product>();
  addToCart = output<number>();
}