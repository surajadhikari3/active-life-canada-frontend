import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="flex h-screen">
      <app-sidebar></app-sidebar>
      <div class="flex-1 overflow-y-auto p-6 bg-gray-100">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {}
