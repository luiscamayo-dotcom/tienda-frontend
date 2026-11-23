import { Routes } from '@angular/router';
import { CatalogPage } from './features/catalog/pages/catalog-page/catalog-page';
import { ProductDetailPage } from './features/catalog/pages/product-detail-page/product-detail-page';
import { CartPage } from './features/cart/pages/cart-page/cart-page';
import { OrderHistoryPage } from './features/orders/pages/order-history-page/order-history-page';
import { AdminOrdersPage } from './features/admin/pages/admin-orders-page/admin-orders-page';
import { AdminProductsPage } from './features/admin/pages/admin-products-page/admin-products-page';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogPage },
  { path: 'producto/:id', component: ProductDetailPage },
  { path: 'carrito', component: CartPage },
  { path: 'mis-pedidos', component: OrderHistoryPage },
  { path: 'admin/pedidos', component: AdminOrdersPage },
  { path: 'admin/productos', component: AdminProductsPage },
  { path: '**', redirectTo: 'catalogo' }
];