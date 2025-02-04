import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SongService, SongDTO } from '../../services/song.service';

@Component({
  selector: 'app-biblio',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './biblio.component.html',
})
export class BiblioComponent implements OnInit {
  songs: SongDTO[] = [];
  currentPage = 0;
  totalPages = 0;
  loading = false;
  error = '';

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.loadSongs();
  }

  loadSongs(page: number = 0) {
    this.loading = true;
    this.songService.getAllSongs(page).subscribe({
      next: (response) => {
        this.songs = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des chansons:', error);
        this.error = 'Erreur lors du chargement des chansons';
        this.loading = false;
      }
    });
  }

  onPageChange(page: number) {
    this.loadSongs(page);
  }
}
