import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

type PreviewMode = 'explore' | 'chat';

@Component({
  selector: 'app-home-guest',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss'],
})
export class HomeGuestComponent {
  previewMode: PreviewMode = 'explore';

  exploreImages = [
    'image-1.jpg',
    'image-2.jpg',
    'image-4.jpg',
    'image-6.jpg',
    'image-8.jpg',
    'client-image1.png',
  ];

  exploreStats = [
    { initial: 'S', name: 'Sara', caption: 'Night lights in Tehran ✨', likes: 240, comments: 18 },
    { initial: 'A', name: 'Ali', caption: 'Code, coffee, repeat ☕', likes: 182, comments: 24 },
    { initial: 'N', name: 'Nima', caption: 'Minimal workspace setup 🖥️', likes: 310, comments: 45 },
    { initial: 'R', name: 'Reza', caption: 'Exploring UI/UX systems 🚀', likes: 145, comments: 12 },
    { initial: 'M', name: 'Maryam', caption: 'Quiet evening thoughts 🌙', likes: 219, comments: 31 },
    { initial: 'Z', name: 'Zahra', caption: 'Synq testnet node verified 🛡️', likes: 520, comments: 64 },
  ];

  selectedIndex = 0;

  get selectedExplore() {
    return this.exploreStats[this.selectedIndex] ?? this.exploreStats[0];
  }

  chatPreview = [
    { initial: 'M', name: 'Maryam', last: 'Did you review the new SignalR hub specs?', time: '2m' },
    { initial: 'A', name: 'Amir', last: 'Backend deployment is complete and live.', time: '12m' },
    { initial: 'N', name: 'Nima', last: 'The glassmorphic dashboard looks sharp!', time: '1h' },
    { initial: 'S', name: 'Sara', last: 'Can you invite the other nodes to group chat?', time: '3h' },
    { initial: 'R', name: 'Reza', last: 'Great performance with MongoDB indexes.', time: 'Yesterday' },
    { initial: 'Z', name: 'Zahra', last: 'Node identity confirmed.', time: '2d' },
  ];

  setPreview(mode: PreviewMode): void {
    this.previewMode = mode;
  }

  selectExplore(i: number): void {
    this.selectedIndex = i;
  }
}
