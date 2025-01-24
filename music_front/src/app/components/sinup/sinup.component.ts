import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sinup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css'],
  host: {
    class: 'flex min-h-full items-center justify-center'
  }
})
export class SinupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.errorMessage = '';
    
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      
      const { confirmPassword, ...signupData } = this.signupForm.value;
      
      console.log('Form data to submit:', signupData);

      this.authService.register(signupData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error: string) => {
          console.error('Registration error:', error);
          this.errorMessage = error;
          this.isSubmitting = false;
        }
      });
    } else {
      if (this.signupForm.errors?.['mismatch']) {
        this.errorMessage = 'Les mots de passe ne correspondent pas';
      } else {
        const errors = [];
        const loginControl = this.signupForm.get('login');
        const passwordControl = this.signupForm.get('password');

        if (loginControl?.errors?.['required']) {
          errors.push('Le nom d\'utilisateur est requis');
        }
        if (loginControl?.errors?.['minlength']) {
          errors.push('Le nom d\'utilisateur doit contenir au moins 3 caractères');
        }
        if (passwordControl?.errors?.['required']) {
          errors.push('Le mot de passe est requis');
        }
        if (passwordControl?.errors?.['minlength']) {
          errors.push('Le mot de passe doit contenir au moins 6 caractères');
        }

        this.errorMessage = errors.join('. ');
      }
    }
  }
}
