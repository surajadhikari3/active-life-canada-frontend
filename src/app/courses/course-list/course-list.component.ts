import {Component, effect, signal} from '@angular/core';
import {CourseService} from '../course.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [
    FormsModule,
    RouterLink,
    NgForOf
  ],
  template: `
    <div class="px-8 py-6">
      <div class="flex items-center mb-6">
        <input
          type="text"
          [ngModel]="search()"
          (ngModelChange)="search.set($event)"
          placeholder="Search courses..."
          class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />

      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ng-container *ngFor="let course of filteredCourses()">
          <div
            class="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img [src]="getImageUrl(course.courseName)" [alt]="course.courseName"
                 class="w-full h-40 object-cover rounded-lg mb-4"/>
            <h6 class="text-xl font-semibold text-gray-900 mb-2">{{ course.barCode }}</h6>
            <p class="text-gray-700 mb-4">{{ course.courseDescription }}</p>
            <a [routerLink]="['/courses/details']" [state]="{ course }"
               class="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              See More <span class="ml-2">➡️</span>
            </a>
          </div>
        </ng-container>
      </div>
    </div>
  `
})
export class CourseListComponent {
  search = signal('');
  filteredCourses = signal<any[]>([]);

  constructor(public courseService: CourseService) {
    courseService.loadCourses();

    effect(() => {
      const all = courseService.courses();
      const query = this.search().toLowerCase();
      const result = query
        ? all.filter(c => c.courseName?.toLowerCase().includes(query))
        : all;
      this.filteredCourses.set(result);
    });
  }

  getImageUrl(name: string): string {
    const map: Record<string, string> = {
      Swimming: 'swim-image.jpg',
      Skating: 'skate-image.jpg',
      Tennis: 'tennis-image.jpeg',
      Basketball: 'basketball-image.jpg',
      Football: 'football-image.jpg'
    };

    return `assets/category/${map[name] || 'default-image.jpg'}`;
  }

}
