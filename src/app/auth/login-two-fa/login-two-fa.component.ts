import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../shared/constants';
import {AuthService} from '../auth.service';
import {ToastService} from '../../shared/toast.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login-two-fa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-two-fa.component.html',
})
export class LoginTwoFaComponent {

  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      familyMemberId: [{ value: this.authService.tempLogin, disabled: true }, Validators.required], // Load from service or session
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting = true;
    const data = {
      familyMemberId: this.form.getRawValue().familyMemberId,
      otp: this.form.get('otp')?.value
    };

    this.http.post(`${API_ENDPOINTS.AUTHENTICATION_BASE_URL}/login/2fa`, data).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.authService.updateAuthenticationStatus({
          memberLoginId: data.familyMemberId,
          isActive: true
        });
        this.toast.success('2FA Login Successful!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Something went wrong');
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }
}
