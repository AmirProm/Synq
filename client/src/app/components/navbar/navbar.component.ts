import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  accountService = inject(AccountService);
  apiUrl = environment.apiUrl;

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
