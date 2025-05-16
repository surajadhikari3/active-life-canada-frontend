import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="store.toggleDrawer(true)" class="relative">
      🛒
      <span *ngIf="store.cartCount() > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {{ store.cartCount() }}
      </span>
    </button>
  `
})
export class CartIconComponent {
  store = inject(CartStore);
}
