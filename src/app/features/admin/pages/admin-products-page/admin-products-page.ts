import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products-page',
  imports: [],
  templateUrl: './admin-products-page.html',
  styleUrl: './admin-products-page.css'
})
export class AdminProductsPage {
  products = [
    { id: 1, name: 'Teclado Mecánico RGB', category: 'Periféricos', price: 240000, stock: 12 },
    { id: 2, name: 'Monitor IPS 24 pulgadas', category: 'Monitores', price: 680000, stock: 5 }
  ];
}