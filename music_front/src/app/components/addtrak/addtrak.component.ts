import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SongService, SongDTO } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addtrak',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './addtrak.component.html',
  styleUrl: './addtrak.component.css'
})
export class AddtrakComponent implements OnInit {
  songForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    private router: Router,
    private authService: AuthService
  ) {
    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      albumId: ['', [Validators.required]],
      trackNumber: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: '/add-track' } 
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      this.selectedFile = file;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Veuillez sélectionner un fichier audio valide';
      this.selectedFile = null;
      event.target.value = null;
    }
  }

  onSubmit() {
    console.log('Form submitted', this.songForm.value);
    console.log('Selected file:', this.selectedFile);
    
    if (this.songForm.valid && this.selectedFile) {
      this.loading = true;
      this.errorMessage = '';

      const songData: SongDTO = {
        title: this.songForm.get('title')?.value,
        albumId: this.songForm.get('albumId')?.value,
        trackNumber: this.songForm.get('trackNumber')?.value
      };

      console.log('Sending song data:', songData);

      this.songService.createSong(songData, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Chanson ajoutée avec succès:', response);
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
            this.errorMessage = `Erreur lors de l'ajout de la chanson: ${error.message || 'Erreur inconnue'}`;
          }
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      if (!this.selectedFile) {
        this.errorMessage = 'Veuillez sélectionner un fichier audio';
      } else {
        this.errorMessage = 'Veuillez remplir tous les champs requis correctement';
      }
    }
  }
}
