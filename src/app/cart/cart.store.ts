import { Injectable, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface OfferedCourse {
  feeType: string;
  courseFee: number;
}

export interface CartItem {
  barCode: string;
  courseName: string;
  offeredCourseFeeDto: OfferedCourse[];
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  private _isDrawerOpen = signal(false);
  private _cartItems = signal<CartItem[]>([]);

  readonly cartItems = this._cartItems;
  readonly isDrawerOpen = this._isDrawerOpen;
  readonly cartCount = signal(0);
  readonly totalPrice = signal(0);

  constructor() {
    const saved = localStorage.getItem('cartItemsWithTime');
    if (saved) {
      const parsed = JSON.parse(saved);
      const now = Date.now();
      const age = now - parsed.timestamp;
      if (age < 24 * 60 * 60 * 1000) {
        this._cartItems.set(parsed.items);
        this.cartCount.set(this.getCartCount(parsed.items));
        this.totalPrice.set(this.calculateTotalPrice(parsed.items));
      } else {
        localStorage.removeItem('cartItemsWithTime');
      }
    }

    const router = inject(Router);
    router.events.subscribe(() => this._isDrawerOpen.set(false));

    effect(() => {
      const items = this._cartItems();
      this.cartCount.set(this.getCartCount(items));
      this.totalPrice.set(this.calculateTotalPrice(items));
      localStorage.setItem('cartItemsWithTime', JSON.stringify({
        timestamp: Date.now(),
        items
      }));
    });
  }

  toggleDrawer(open: boolean) {
    this._isDrawerOpen.set(open);
  }

  addItem(item: Omit<CartItem, 'quantity'>) {
    const current = this._cartItems();
    const existing = current.find(i => i.barCode === item.barCode);

    if (existing) {
      existing.quantity++;
      this._cartItems.set([...current]);
    } else {
      this._cartItems.set([...current, { ...item, quantity: 1 }]);
    }
  }

  increaseQuantity(barCode: string) {
    const updated = this._cartItems().map(item =>
      item.barCode === barCode
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    this._cartItems.set(updated);
  }

  decreaseQuantity(barCode: string) {
    const current = this._cartItems();
    const updated = current
      .map(item =>
        item.barCode === barCode
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    this._cartItems.set(updated);
  }

  removeItem(barCode: string) {
    const updated = this._cartItems().filter(i => i.barCode !== barCode);
    this._cartItems.set(updated);
  }

  resetCart() {
    this._cartItems.set([]);
    this._isDrawerOpen.set(false);
    localStorage.removeItem('cartItemsWithTime');
  }

  private calculateTotalPrice(items: CartItem[]): number {
    return items.reduce(
      (sum, item) =>
        sum + item.quantity * (item.offeredCourseFeeDto[0]?.courseFee || 0),
      0
    );
  }

  private getCartCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
