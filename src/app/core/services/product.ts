import { Injectable } from '@angular/core';
import { Category, Product } from '../models/marketplace.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly categories: Category[] = [
    { id: 1, name: 'Periféricos' },
    { id: 2, name: 'Monitores' },
    { id: 3, name: 'Audio' }
  ];

  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Teclado Mecánico RGB',
      description: 'Switches táctiles silenciosos y retroiluminación personalizable.',
      price: 240000,
      stock: 12,
      categoryId: 1,
      categoryName: 'Periféricos',
      imageUrl: 'https://placehold.co/400x260?text=Teclado+RGB'
    },
    {
      id: 2,
      name: 'Monitor IPS 24 pulgadas',
      description: 'Resolución Full HD 1080p a 100Hz con bordes ultradelgados.',
      price: 680000,
      stock: 5,
      categoryId: 2,
      categoryName: 'Monitores',
      imageUrl: 'https://placehold.co/400x260?text=Monitor+24'
    },
    {
      id: 3,
      name: 'Mouse Inalámbrico Ergonómico',
      description: 'Sensor óptico de alta precisión con batería recargable USB-C.',
      price: 135000,
      stock: 18,
      categoryId: 1,
      categoryName: 'Periféricos',
      imageUrl: 'https://placehold.co/400x260?text=Mouse+Pro'
    },
    {
      id: 4,
      name: 'Audífonos Studio Over-Ear',
      description: 'Cancelación pasiva de ruido y micrófono desmontable.',
      price: 310000,
      stock: 0,
      categoryId: 3,
      categoryName: 'Audio',
      imageUrl: 'https://placehold.co/400x260?text=Audifonos'
    },
    {
      id: 5,
      name: 'Monitor Curvo 27 pulgadas',
      description: 'Panel QHD 144Hz ideal para productividad y diseño.',
      price: 1150000,
      stock: 3,
      categoryId: 2,
      categoryName: 'Monitores',
      imageUrl: 'https://placehold.co/400x260?text=Monitor+27'
    }
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((item) => item.id === id);
  }

  addProduct(data: Omit<Product, 'id' | 'categoryName'>): void {
    const category = this.categories.find((c) => c.id === data.categoryId);
    const nextId = Math.max(0, ...this.products.map((p) => p.id)) + 1;
    this.products.push({
      ...data,
      id: nextId,
      categoryName: category ? category.name : 'General'
    });
  }

  updateProduct(id: number, data: Omit<Product, 'id' | 'categoryName'>): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return;
    const category = this.categories.find((c) => c.id === data.categoryId);
    this.products[index] = {
      ...data,
      id,
      categoryName: category ? category.name : 'General'
    };
  }
}