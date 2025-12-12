import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

type PreviewMode = 'explore' | 'chat';

@Component({
  selector: 'app-home-guest',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss']

})
export class HomeGuestComponent {
  previewMode: PreviewMode = 'explore';

  exploreImages: string[] = [
    'image-1.jpg',
    'image-2.jpg',
    'image-6.jpg',
    'image-8.jpg',
    'image-4.jpg',
    'client-image1.png',
  ];

  exploreStats = [
    { initial: 'A', name: 'Alex', caption: 'A clean UI concept drop — minimal & bold.', likes: 234, comments: 45 },
    { initial: 'S', name: 'Sarah', caption: 'New community post: ideas that ship fast.', likes: 512, comments: 89 },
    { initial: 'D', name: 'Design Team', caption: 'Small changes, huge UX wins.', likes: 128, comments: 22 },
    { initial: 'M', name: 'Mina', caption: 'Exploring new layouts for social + chat.', likes: 301, comments: 54 },
    { initial: 'S', name: 'Synq', caption: 'A clean UI concept drop — minimal & bold.', likes: '2M', comments: '900k' },
    { initial: 'A', name: 'Amir', caption: 'Small changes, huge UX wins', likes: '38M', comments: '5M' },
  ];

  selectedIndex = 0;
  get selectedExplore() {
    return this.exploreStats[this.selectedIndex];
  }

  chatPreview = [
    { initial: 'D', name: 'Design Team', last: 'Let’s sync tomorrow — shipping UI updates.', time: '2m' },
    { initial: 'S', name: 'Sarah Chen', last: 'That looks great. Push the navbar change.', time: '1h' },
    { initial: 'P', name: 'Product Crew', last: 'Explore feed v1 is ready for backend.', time: '3h' },
    { initial: 'A', name: 'Alex Johnson', last: 'Can we make the profile card cleaner?', time: '5h' },
    { initial: 'S', name: 'Synq', last: 'Can youe massege in Synq', time: '1d' },
    { initial: 'G', name: 'Gender', last: 'yes is very God Synq is best social media', time: '1d' },
  ];

  setPreview(mode: PreviewMode) {
    this.previewMode = mode;
  }

  selectExplore(i: number) {
    this.selectedIndex = i;
  }
}