import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  template: `
  <div class="bg-gray-50">
  <section class="bg-blue-300 text-white text-center py-16">
    <h1 class="text-4xl font-bold mb-4">Active Life Canada</h1>
    <p class="text-xl mb-6">Recreational Activities for Every Resident</p>
    <a routerLink="/courses" class="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl">
      Explore Activities
    </a>
  </section>

  <section id="activities" class="py-16">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Our Popular Activities</h2>
      <div class="grid md:grid-cols-2 gap-12">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/assets/category/swim-image.jpg" alt="Swimming" class="w-full h-64 object-cover" />
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-4">Swimming</h3>
            <p class="text-gray-600 mb-4">
              Enjoy refreshing swimming sessions at our indoor pools, perfect for all ages.
            </p>
            <a routerLink="/swimming" class="text-blue-600">Learn More &raquo;</a>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/assets/category/skating-image.jpg" alt="Skating" class="w-full h-64 object-cover" />
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-4">Skating</h3>
            <p class="text-gray-600 mb-4">
              Glide across the ice with our expert skating facilities, open to all skill levels.
            </p>
            <a routerLink="/skating" class="text-blue-600">Learn More &raquo;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-gray-100 py-16">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">For Our Residents</h2>
      <p class="text-xl mb-8">
        Active Life Canada offers residents easy access to a variety of activities that promote health and wellness.
      </p>
      <img src="/assets/category/city-image.jpg" alt="City Overview" class="mx-auto rounded-lg shadow-lg" />
    </div>
  </section>

  <section class="bg-blue-300 text-white text-center py-16">
    <h2 class="text-3xl font-bold mb-4">Join Us Today</h2>
    <p class="text-xl mb-6">Start living a healthier, more active lifestyle.</p>
    <a routerLink="/signup" class="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl">
      Sign Up Now
    </a>
  </section>
</div>
  `
})
export class LandingComponent {

}
