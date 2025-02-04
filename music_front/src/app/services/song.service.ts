import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface SongDTO {
  id?: string;
  title: string;
  albumId?: string;
  duration?: number;
  trackNumber?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'http://localhost:8080/api/songs';

  constructor(private http: HttpClient) { }

  getAllSongs(page: number = 0, size: number = 10): Observable<PageResponse<SongDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<SongDTO>>(this.apiUrl, { params }).pipe(
      tap(response => console.log('Songs fetched:', response))
    );
  }

  createSong(songData: SongDTO, audioFile: File): Observable<SongDTO> {
    const formData = new FormData();
    formData.append('song', new Blob([JSON.stringify(songData)], { type: 'application/json' }));
    formData.append('file', audioFile);

    const token = localStorage.getItem('user-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<SongDTO>(this.apiUrl, formData, { headers }).pipe(
      tap({
        next: (response) => console.log('Chanson créée avec succès:', response),
        error: (error) => console.error('Erreur lors de la création:', error)
      })
    );
  }
} 