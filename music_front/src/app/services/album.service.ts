import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AlbumDTO {
  id?: string;
  title: string;
  artist: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://localhost:8080/api/albums';

  constructor(private http: HttpClient) { }

  createAlbum(album: AlbumDTO): Observable<AlbumDTO> {
    // Récupérer le token du localStorage
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` // Ajouter le token d'authentification
    });

    return this.http.post<AlbumDTO>(this.apiUrl, album, { headers }).pipe(
      tap({
        next: (response) => console.log('Réponse du serveur:', response),
        error: (error) => console.error('Erreur complète:', error)
      })
    );
  }
} 