import {Component, computed, inject} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {CartIconComponent} from '../../cart/cart-icon.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, CartIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private auth = inject(AuthService);
  router = inject(Router);
  isLoggedIn = computed(() => this.auth.isAuthenticated());

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
