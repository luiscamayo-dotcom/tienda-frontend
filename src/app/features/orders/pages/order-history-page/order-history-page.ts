import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../../core/services/order';

@Component({
  selector: 'app-order-history-page',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './order-history-page.html',
  styleUrl: './order-history-page.css'
})
export class OrderHistoryPage {
  readonly orderService = inject(OrderService);
}