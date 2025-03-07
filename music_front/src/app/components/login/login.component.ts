import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    class: 'flex min-h-full items-center justify-center'
  }
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isSubmitting = false;
  returnUrl: string = '/biblio';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Récupérer l'URL de retour des paramètres de requête
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/biblio';
  }

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.errorMessage = '';
    
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login response in component:', response);
          // Le token est déjà sauvegardé dans le service si présent
          if (this.authService.getToken()) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.errorMessage = 'Connexion réussie mais pas de token reçu';
            this.isSubmitting = false;
          }
        },
        error: (error: string) => {
          console.error('Login error in component:', error);
          this.errorMessage = error;
          this.isSubmitting = false;
        }
      });
    } else {
      const errors = [];
      const loginControl = this.loginForm.get('login');
      const passwordControl = this.loginForm.get('password');

      if (loginControl?.errors?.['required']) {
        errors.push('Le nom d\'utilisateur est requis');
      }
      if (passwordControl?.errors?.['required']) {
        errors.push('Le mot de passe est requis');
      }

      this.errorMessage = errors.join('. ');
    }
  }
}
