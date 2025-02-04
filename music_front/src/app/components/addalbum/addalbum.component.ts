import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumService, AlbumDTO } from '../../services/album.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-addalbum',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NavbarComponent
  ],
  templateUrl: './addalbum.component.html',
  styleUrl: './addalbum.component.css'
})
export class AddalbumComponent implements OnInit {
  albumForm: FormGroup;
  errorMessage: string = '';
  currentYear: number = new Date().getFullYear();
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private authService: AuthService
  ) {
    this.albumForm = this.fb.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]]
    });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: '/add-album' } 
      });
    }
  }

  onSubmit() {
    if (this.albumForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const album: AlbumDTO = this.albumForm.value;
      
      this.albumService.createAlbum(album).subscribe({
        next: (response) => {
          console.log('Album créé avec succès:', response);
          this.router.navigate(['/biblio']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur détaillée:', error);
          if (error.status === 0) {
            this.errorMessage = 'Impossible de contacter le serveur. Veuillez vérifier que le backend est en cours d\'exécution.';
          } else if (error.status === 403) {
            this.errorMessage = 'Accès non autorisé. Veuillez vous reconnecter.';
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = `Erreur lors de l'ajout de l'album: ${error.message || 'Erreur inconnue'}`;
          }
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
