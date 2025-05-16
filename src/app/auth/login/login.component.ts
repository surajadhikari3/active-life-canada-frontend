import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastService} from '../../shared/toast.service';
import {AuthService} from '../auth.service';
import {API_ENDPOINTS} from '../../shared/constants';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      familyMemberId: ['', Validators.required],
      familyPin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting = true;
    const formData = this.form.value;

    this.http.post(`${API_ENDPOINTS.AUTHENTICATION_BASE_URL}/login`, formData).subscribe({
      next: () => {
        this.authService.tempLogin = formData.familyMemberId;
        this.toast.success('Login Successful! OTP sent');
        this.router.navigate(['/login2FA']);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Login failed');
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }
}
