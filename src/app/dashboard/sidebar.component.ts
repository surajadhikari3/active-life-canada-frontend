import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div class="p-4 text-xl font-bold border-b border-gray-700">Dashboard</div>
      <nav class="flex-1 p-4 space-y-2">
        <a routerLink="/dashboard/home" routerLinkActive="bg-blue-600" class="block p-2 rounded hover:bg-blue-600">
          🏠 Home
        </a>

        <div>
          <div class="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-blue-600" (click)="toggleFamily()">
            👨‍👩‍👧‍👦 Family
            <span [class.rotate-180]="showFamily" class="transition-transform">⌄</span>
          </div>
          <div *ngIf="showFamily" class="ml-4 mt-2 space-y-1">
            <a routerLink="/dashboard/family" class="block p-2 rounded hover:bg-blue-600">
              Family Members
            </a>
          </div>
        </div>

        <a routerLink="/dashboard/course-registration" routerLinkActive="bg-blue-600" class="block p-2 rounded hover:bg-blue-600">
          📚 Registered Course
        </a>
        <a routerLink="/dashboard/cart" routerLinkActive="bg-blue-600" class="block p-2 rounded hover:bg-blue-600">
          🛒 Cart
        </a>
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  showFamily = false;

  toggleFamily() {
    this.showFamily = !this.showFamily;
  }
}
