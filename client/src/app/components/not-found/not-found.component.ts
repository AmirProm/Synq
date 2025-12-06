import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})

export class NotFoundComponent implements OnInit, OnDestroy {
  messages: string[] = [
    'This corner of Synq is still quiet.',
    'Maybe the link took a wrong turn.',
    'No noise here—just empty space.',
  ];

  currentIndex = 0;
  private intervalId?: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    }, 2600);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get currentMessage(): string {
    return this.messages[this.currentIndex];
  }
}
