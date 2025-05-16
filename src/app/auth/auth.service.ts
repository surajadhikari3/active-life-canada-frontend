import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<{ memberLoginId: string; isActive: boolean } | null>(null);
  readonly user = this._user;

  private token = signal<string | null>(null); // Used for UI bindings or debug if needed

  tempLogin: string | null = null;

  constructor() {
    // Optional: restore session from localStorage on app load
    const savedUser = localStorage.getItem('authUser');
    const savedToken = localStorage.getItem('authToken');

    if (savedUser && savedToken) {
      this._user.set(JSON.parse(savedUser));
      this.token.set(savedToken);
    }
  }

  updateAuthenticationStatus(user: { memberLoginId: string; isActive: boolean }) {
    this._user.set(user);
    localStorage.setItem('authUser', JSON.stringify(user));
  }

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    this._user.set(null);
    this.token.set(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }

  isAuthenticated = computed(() => this._user() !== null);
}
