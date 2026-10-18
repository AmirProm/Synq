import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class termsComponent implements OnInit {
  private router = inject(Router);
  accepted: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('termsAccepted') === 'true') {
      this.router.navigate(['/']);
    }
  }

  toggleAccepted(): void {
    this.accepted = !this.accepted;
  }

  onAcceptChange(event: Event): void {
    this.accepted = (event.target as HTMLInputElement).checked;
  }

  acceptTerms(): void {
    if (!this.accepted) return;
    localStorage.setItem('termsAccepted', 'true');
    this.router.navigate(['/']);
  }
}
