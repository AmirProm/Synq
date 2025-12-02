import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-access',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-access.component.html',
  styleUrl: './no-access.component.scss'
})
export class NoAccessComponent {

}
