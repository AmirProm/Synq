import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  isRetrying: boolean = false;

  retryConnection(): void {
    if (this.isRetrying) return;

    this.isRetrying = true;

    setTimeout(() => {
      window.location.reload();
    }, 850);
  }
}
