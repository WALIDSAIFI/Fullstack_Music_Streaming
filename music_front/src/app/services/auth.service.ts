import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

const API_URL = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  jwt?: string;
  access_token?: string;
  bearerToken?: string;
  message?: string;
  [key: string]: any;  // Pour accepter n'importe quelle autre propriété
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Erreur: ' + error.error.message;
    } else if (!navigator.onLine) {
      errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
    } else if (error.status === 0) {
      errorMessage = 'Impossible de contacter le serveur. Vérifiez que le serveur est bien démarré.';
    } else if (error.status === 400) {
      errorMessage = 'Données invalides. Veuillez vérifier vos informations.';
    } else if (error.status === 401) {
      errorMessage = 'Identifiants incorrects.';
    } else {
      errorMessage = `Erreur ${error.status}: ${error.error?.message || 'Une erreur est survenue'}`;
    }
    
    console.error('Server error details:', error);
    return throwError(() => errorMessage);
  }

  private extractToken(response: any): string | null {
    console.log('Extracting token from response:', response);
    
    // Vérifie les différents formats possibles de token
    const possibleTokenKeys = ['token', 'accessToken', 'jwt', 'access_token', 'bearerToken'];
    
    // Si la réponse est une chaîne directe, c'est probablement le token
    if (typeof response === 'string') {
      return response;
    }
    
    // Cherche dans les propriétés connues
    for (const key of possibleTokenKeys) {
      if (response[key]) {
        return response[key];
      }
    }
    
    // Si le token est dans une sous-propriété
    if (response.data?.token) return response.data.token;
    if (response.body?.token) return response.body.token;
    
    return null;
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    console.log('Sending login request:', request);
    
    return this.http.post<AuthResponse>(
      `${API_URL}/login`, 
      request, 
      httpOptions
    ).pipe(
      tap(response => {
        console.log('Raw login response:', response);
        const token = this.extractToken(response);
        console.log('Extracted token:', token);
        
        if (token) {
          this.saveToken(token);
        } else {
          console.warn('No token found in response. Full response:', response);
        }
      }),
      catchError(this.handleError)
    );
  }

  register(request: RegisterRequest): Observable<any> {
    console.log('Sending register request:', request);

    return this.http.post(
      `${API_URL}/register`, 
      request,
      httpOptions
    ).pipe(
      tap(response => {
        console.log('Register success:', response);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('user-token');
  }

  saveToken(token: string): void {
    console.log('Saving token:', token);
    localStorage.setItem('user-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('user-token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('user-token');
    return !!token; // Retourne true si le token existe
  }
} 