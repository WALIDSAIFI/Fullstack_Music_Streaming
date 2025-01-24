import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-biblio',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './biblio.component.html',
})
export class BiblioComponent {
}
