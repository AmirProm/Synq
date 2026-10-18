import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-no-access',
  standalone: true,
  imports: [RouterLink,MatIconModule],
  templateUrl: './no-access.component.html',
  styleUrl: './no-access.component.scss'
})
export class NoAccessComponent {

}
