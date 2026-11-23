export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export interface ProductFilterCriteria {
  searchTerm: string;
  categoryId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerName: string;
  address: string;
  date: string;
  status: 'Pendiente' | 'Enviado' | 'Entregado';
  total: number;
  items: OrderItem[];
}
export interface CartItem {
  product: Product;
  quantity: number;
}