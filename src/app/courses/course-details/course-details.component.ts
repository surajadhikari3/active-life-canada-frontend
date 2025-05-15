import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [
    FormsModule,
    NgClass
  ],
  template: `
    <div *ngIf="course" class="bg-gray-100 mt-20">
      <div class="max-w-6xl mx-auto px-4 py-8 flex flex-wrap gap-6">
        <div class="w-full md:w-1/2">
          <img
            [src]="getImageUrl(course.courseName)"
            [alt]="course.courseName"
            class="w-full rounded-lg shadow-md"
          />
        </div>

        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-bold mb-2">{{ course.courseName }}</h2>
          <p class="text-gray-600 mb-4">Course ID: {{ course.courseId }}</p>
          <p class="text-gray-600 mb-4">Barcode: {{ course.barCode }}</p>
          <span
            class="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white mb-4"
            [ngClass]="course.availableForEnrollment ? 'bg-green-600' : 'bg-red-600'">
            {{ course.availableForEnrollment ? 'Available' : 'Closed' }}
          </span>

          <p class="text-gray-700 mb-2"><strong>Start Date:</strong> {{ course.startDate }}</p>
          <p class="text-gray-700 mb-2"><strong>End Date:</strong> {{ course.endDate }}</p>
          <p class="text-gray-700 mb-6">{{ course.courseDescription }}</p>

          <label class="block text-lg font-semibold mb-2">Select Fee Type:</label>
          <select
            class="w-full p-2 border-4 border-gray-500 rounded-md focus:ring-2 mb-4"
            [(ngModel)]="selectedFeeType">
            <option value="" disabled>Select a Fee Type</option>
            <option *ngFor="let f of course.offeredCourseFeeDto" [value]="f.feeType">
              {{ f.feeType }} - "$"{{ f.courseFee }}
            </option>
          </select>

          <button class="mt-4 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CourseDetailsComponent {
  course: any;
  selectedFeeType = '';

  constructor(private route: Router) {
    this.course = this.route.getCurrentNavigation()?.extras?.state?.['course'];
  }

  getImageUrl(name: string): string {
    const map: Record<string, string> = {
      Swimming: 'swim-image.jpg',
      Skating: 'skate-image.jpg',
      Tennis: 'tennis-image.jpeg',
      Basketball: 'basketball-image.jpg',
      Football: 'football-image.jpg'
    };
    return `/assets/category/${map[name] || 'default-image.jpg'}`;
  }

}
