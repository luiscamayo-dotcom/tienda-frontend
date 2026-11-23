import { Injectable, signal } from '@angular/core';
import { CartItem, Order } from '../models/marketplace.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly ordersState = signal<Order[]>([
    {
      id: 1024,
      customerName: 'Laura Gómez',
      address: 'Calle 12 # 4-55',
      date: '2026-11-18',
      status: 'Entregado',
      total: 240000,
      items: [
        { productId: 1, productName: 'Teclado Mecánico RGB', quantity: 1, unitPrice: 240000 }
      ]
    }
  ]);

  readonly orders = this.ordersState.asReadonly();

  createOrder(customerName: string, address: string, cartItems: CartItem[], total: number): Order {
    const newOrder: Order = {
      id: Math.floor(1030 + Math.random() * 900),
      customerName,
      address,
      date: new Date().toISOString().split('T')[0],
      status: 'Pendiente',
      total,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price
      }))
    };

    this.ordersState.update((current) => [newOrder, ...current]);
    return newOrder;
  }

  updateOrderStatus(orderId: number, status: Order['status']): void {
    this.ordersState.update((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  }
}