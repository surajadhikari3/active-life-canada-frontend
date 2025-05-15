import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../shared/constants';
import { ToastService } from '../../shared/toast.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form: FormGroup;
  submitting = false;

  fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
    { name: 'familyPin', label: 'Family Pin', type: 'number', placeholder: 'Enter a 5-digit pin' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'homePhone', label: 'Home Phone', type: 'tel', placeholder: 'Enter your phone number' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      familyPin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      homePhone: ['', Validators.required],
      preferredContact: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;
    const formData = this.form.value;

    this.http.post(`${API_ENDPOINTS.AUTHENTICATION_BASE_URL}/signup`, formData).subscribe({
      next: () => {
        this.toast.success('Signup Successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Signup failed');
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }
}

