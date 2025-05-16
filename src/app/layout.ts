import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';
import {CartDrawerComponent} from './cart/cart-drawer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, CartDrawerComponent],
  template: `
    <app-header/>
    <main class="pt-20 px-4 sm:px-6 lg:px-8">
      <router-outlet></router-outlet>
    </main>
    <app-cart-drawer/>
  `
})

export class LayoutComponent {}
