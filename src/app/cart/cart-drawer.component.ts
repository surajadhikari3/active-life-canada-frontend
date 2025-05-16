import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartStore } from './cart.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import {API_ENDPOINTS} from '../shared/constants';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="store.isDrawerOpen()" class="fixed inset-0 bg-black/30 z-40" (click)="store.toggleDrawer(false)"></div>

    <aside *ngIf="store.isDrawerOpen()" class="fixed top-0 right-0 z-50 bg-white shadow-lg w-96 h-full overflow-auto p-6">
      <h2 class="text-xl font-bold mb-4">Your Cart</h2>

      <div *ngIf="store.cartItems().length === 0" class="text-gray-500 text-center mt-10">
        Your cart is empty 🛒
      </div>

      <div *ngFor="let item of store.cartItems()" class="mb-4 border-b pb-4">
        <h3 class="font-semibold text-gray-800">{{ item.courseName }}</h3>
        <p class="text-sm text-gray-600">Barcode: {{ item.barCode }}</p>
        <p class="text-sm text-gray-700">
          Price: <span>$</span>{{ item.offeredCourseFeeDto[0]?.courseFee || 0 }} × {{ item.quantity }}
        </p>

        <div class="mt-2 flex items-center gap-2">
          <button (click)="decrease(item.barCode)" class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">➖</button>
          <span class="px-2">{{ item.quantity }}</span>
          <button (click)="increase(item.barCode)" class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">➕</button>
          <button (click)="remove(item.barCode)" class="text-red-500 ml-auto hover:underline text-sm">🗑️ Remove</button>
        </div>
      </div>

      <div *ngIf="store.cartItems().length > 0" class="mt-6">
        <p class="font-medium text-lg">Total: <span>$</span>{{ store.totalPrice() }}</p>
        <button (click)="checkout()" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </aside>
  `
})
export class CartDrawerComponent {
  store = inject(CartStore);
  http = inject(HttpClient);
  router = inject(Router);
  snack = inject(MatSnackBar);
  authService = inject(AuthService);

  increase(barCode: string) {
    this.store.increaseQuantity(barCode);
  }

  decrease(barCode: string) {
    this.store.decreaseQuantity(barCode);
  }

  remove(barCode: string) {
    this.store.removeItem(barCode);
    this.snack.open('Item removed from cart', 'Close', { duration: 2000 });
  }

  checkout() {
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    const memberLoginId = this.authService.tempLogin;
    const payload = {
      cartId: null,
      cartItems: this.store.cartItems(),
      isActive: true,
      familyMemberId: memberLoginId,
      cartCount: this.store.cartCount(),
      totalPrice: this.store.totalPrice()
    };

    this.http.post(API_ENDPOINTS.CART, payload,{
      headers: {
        'X-family-member-id' : String (memberLoginId)
      }
    }).subscribe({
      next: () => {
        this.store.resetCart();
        this.router.navigate(['/dashboard/home']);
        this.snack.open('Successfully registered to the course!', 'Close', { duration: 3000 });
      },
      error: (err) => {
        const msg = err?.error?.message || 'Something went wrong while registering';
        this.snack.open(msg, 'Close', { duration: 3000 });
      }
    });
  }
}
