import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, ProductFilterCriteria } from '../../../../core/models/marketplace.model';

@Component({
  selector: 'app-catalog-filters',
  imports: [FormsModule],
  templateUrl: './catalog-filters.html',
  styleUrl: './catalog-filters.css'
})
export class CatalogFilters {
  categories = input.required<Category[]>();
  filtersChange = output<ProductFilterCriteria>();

  searchTerm = '';
  selectedCategoryId: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  emitFilters(): void {
    this.filtersChange.emit({
      searchTerm: this.searchTerm.trim(),
      categoryId: this.selectedCategoryId,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategoryId = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.emitFilters();
  }
}