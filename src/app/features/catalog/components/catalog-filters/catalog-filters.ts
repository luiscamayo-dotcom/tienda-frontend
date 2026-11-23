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
  // Recibe las categorías y entrega a la página los criterios seleccionados.
  categories = input.required<Category[]>();
  filtersChange = output<ProductFilterCriteria>();

  searchTerm = '';
  selectedCategoryId: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  emitFilters(): void {
    // Publica una copia normalizada de los valores actuales del formulario.
    this.filtersChange.emit({
      searchTerm: this.searchTerm.trim(),
      categoryId: this.selectedCategoryId,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  resetFilters(): void {
    // Restablece todos los criterios y actualiza los resultados del catálogo.
    this.searchTerm = '';
    this.selectedCategoryId = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.emitFilters();
  }
}