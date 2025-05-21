import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CartStore, OfferedCourse} from '../../cart/cart.store';
import { Location } from '@angular/common';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  template: `



    <div *ngIf="course" class="relative bg-gray-100">

      <div class="relative bg-gray-100">
        <!-- Back Button -->
        <button
          class="absolute right-4 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 z-10"
          (click)="goBack()"
        >
          ← Back to Courses
        </button>

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
              {{ f.feeType }} - <span>$</span>{{ f.courseFee }}
            </option>
          </select>

          <button
            class="mt-4 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
            (click)="addToCart()"
            [disabled]="!selectedFeeType"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  `
})
export class CourseDetailsComponent {
  course: any;
  selectedFeeType = '';

  private cartStore = inject(CartStore);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private location = inject(Location);

  constructor() {
    this.course = this.router.getCurrentNavigation()?.extras?.state?.['course'] || history.state['course'];
    console.log("course", this.course);
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

  goBack() {
    this.location.back();
  }


  addToCart() {
    console.log("course", this.course);
    const feeExists = this.course.offeredCourseFeeDto.some((f: OfferedCourse) => f.feeType === this.selectedFeeType);
    if (!feeExists) {
      this.snackBar.open('Invalid fee selection', 'Close', {duration: 2000});
      return;
    }

    const selected = {
      ...this.course,
      offeredCourseFeeDto: this.course.offeredCourseFeeDto.filter((f: OfferedCourse) => f.feeType === this.selectedFeeType)
    };

    this.cartStore.addItem(selected);
    this.cartStore.toggleDrawer(true);
    this.snackBar.open('Item added to cart!', 'Close', {duration: 2000});
  }
}
