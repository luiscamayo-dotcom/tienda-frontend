import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { OrderService } from '../../../../core/services/order';
import { Order } from '../../../../core/models/marketplace.model';

@Component({
  selector: 'app-admin-orders-page',
  imports: [DecimalPipe],
  templateUrl: './admin-orders-page.html',
  styleUrl: './admin-orders-page.css'
})
export class AdminOrdersPage {
  readonly orderService = inject(OrderService);

  onStatusChange(orderId: number, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value as Order['status'];
    this.orderService.updateOrderStatus(orderId, newStatus);
  }
}