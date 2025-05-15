import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private _user = signal<{ memberLoginId: string; isActive: boolean } | null>(null);
  readonly user = this._user;
  tempLogin: string | null = null;

  updateAuthenticationStatus(user: { memberLoginId: string; isActive: boolean }) {
    this._user.set(user);
    sessionStorage.setItem('authToken', JSON.stringify(user));
  }

  logout() {
    this._user.set(null);
    sessionStorage.removeItem('authToken');
  }

  isAuthenticated = computed(() => this._user() !== null);
}
