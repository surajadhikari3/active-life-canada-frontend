import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  success(message: string) {
    alert(`✅ SUCCESS: ${message}`);
  }

  error(message: string) {
    alert(`❌ ERROR: ${message}`);
  }
}
