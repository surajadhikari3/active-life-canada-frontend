// src/app/courses/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import {API_ENDPOINTS} from "../shared/constants"

@Injectable({ providedIn: 'root' })
export class CourseService {
  courses = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  loadCourses() {
    this.http.get<any[]>(API_ENDPOINTS.OFFERED_COURSE).subscribe({
      next: data => this.courses.set(data),
      error: err => console.error('Failed to fetch courses:', err)
    });
  }
}
