import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { CatalogFilters } from '../../components/catalog-filters/catalog-filters';
import { ProductService } from '../../../../core/services/product';
import { CartService } from '../../../../core/services/cart';
import { Category, Product, ProductFilterCriteria } from '../../../../core/models/marketplace.model';

@Component({
  selector: 'app-catalog-page',
  imports: [ProductCard, CatalogFilters],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css'
})
export class CatalogPage implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  allProducts: Product[] = [];
  filteredProducts = signal<Product[]>([]);
  categories: Category[] = [];
  isLoading = signal(true);

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    setTimeout(() => {
      this.allProducts = this.productService.getProducts();
      this.filteredProducts.set([...this.allProducts]);
      this.isLoading.set(false);
    }, 300);
  }

  applyFilters(criteria: ProductFilterCriteria): void {
    const term = criteria.searchTerm.toLowerCase();

    const results = this.allProducts.filter((product) => {
      const matchesName =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      const matchesCategory =
        criteria.categoryId === null || product.categoryId === criteria.categoryId;

      const matchesMinPrice =
        criteria.minPrice === null || product.price >= criteria.minPrice;

      const matchesMaxPrice =
        criteria.maxPrice === null || product.price <= criteria.maxPrice;

      return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    this.filteredProducts.set(results);
  }

  onAddToCart(productId: number): void {
    const product = this.productService.getProductById(productId);
    if (product) {
      this.cartService.addItem(product, 1);
    }
  }
}