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
  // Servicio compartido para mostrar pedidos y propagar cambios de estado.
  readonly orderService = inject(OrderService);

  onStatusChange(orderId: number, event: Event): void {
    // Lee la opción elegida y la aplica al pedido correspondiente.
    const newStatus = (event.target as HTMLSelectElement).value as Order['status'];
    this.orderService.updateOrderStatus(orderId, newStatus);
  }
}