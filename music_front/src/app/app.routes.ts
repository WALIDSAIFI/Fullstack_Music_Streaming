import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SinupComponent } from './components/sinup/sinup.component';
import { BiblioComponent } from './components/biblio/biblio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SinupComponent },
  { 
    path: 'biblio', 
    component: BiblioComponent,
    children: [
      { path: '', redirectTo: 'playlists', pathMatch: 'full' },
      { path: 'playlists', component: BiblioComponent },
      { path: 'favorites', component: BiblioComponent },
      { path: 'search', component: BiblioComponent }
    ]
  },
  { path: '**', redirectTo: '/login' } // Route par défaut si l'URL n'existe pas
];
