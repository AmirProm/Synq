import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

type ExploreTag = 'all' | 'design' | 'product' | 'update';

interface ExploreItem {
    id: number;
    tag: ExploreTag;
    title: string;
    subtitle: string;
    imageUrl: string;
    author: string;
    createdAt: Date;
    likes: number;
}

@Component({
    selector: 'app-explore',
    standalone: true,
    imports: [NgFor, NgIf, TitleCasePipe, RouterLink, DecimalPipe],
    templateUrl: './explor.component.html',
    styleUrl: './explor.component.scss'
})
export class ExploreComponent implements OnInit, OnDestroy {
    activeTag: ExploreTag = 'all';

    items: ExploreItem[] = [
        {
            id: 1,
            tag: 'design',
            title: 'Soft chat layout for deep focus',
            subtitle: 'Exploring muted colors and breathing space in messaging UIs.',
            imageUrl: 'image-1.jpg',
            author: 'Lena · UI',
            createdAt: new Date(Date.now() - 3 * 60 * 1000),
            likes: 27,
        },
        {
            id: 2,
            tag: 'product',
            title: 'Quiet social, not noisy feeds',
            subtitle: 'Why Synq keeps timelines feeling more like a journal than a casino.',
            imageUrl: 'image-2.jpg',
            author: 'Arman · Product',
            createdAt: new Date(Date.now() - 18 * 60 * 1000),
            likes: 54,
        },
        {
            id: 3,
            tag: 'update',
            title: 'New: synced explore & chat handoff',
            subtitle: 'Jump into a chat from any explore card without losing context.',
            imageUrl: 'image-3.jpg',
            author: 'Team Synq',
            createdAt: new Date(Date.now() - 60 * 60 * 1000),
            likes: 39,
        },
        {
            id: 4,
            tag: 'design',
            title: 'Micro-animations that don’t scream',
            subtitle: 'Subtle motion that supports focus instead of stealing it.',
            imageUrl: 'image-4.jpg',
            author: 'Mina · Motion',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            likes: 61,
        },
        {
            id: 5,
            tag: 'product',
            title: 'Building for small, real groups',
            subtitle: 'Synq is tuned for circles, not infinite follow counts.',
            imageUrl: 'image-5.jpg',
            author: 'Kian · Product',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            likes: 72,
        },
        {
            id: 6,
            tag: 'product',
            title: 'Dark mode with gentle contrast',
            subtitle: 'New palette that stays calm at 3 AM.',
            imageUrl: 'image-6.jpg',
            author: 'Team Synq',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            likes: 46,
        },
        {
            id: 7,
            tag: 'update',
            title: 'Instant matching',
            subtitle: 'Match interests and open small, real groups instantly.',
            imageUrl: 'image-9.jpg',
            author: 'Team Synq',
            createdAt: new Date(Date.now() - 30 * 60 * 1000),
            likes: 58,
        },
        {
            id: 8,
            tag: 'all',
            title: 'Hi Synq',
            subtitle: 'Testing the explore grid.',
            imageUrl: 'image-8.jpg',
            author: 'Amir · Product',
            createdAt: new Date(),
            likes: 4500,
        },

        {
            id: 9,
            tag: 'design',
            title: 'Soft chat layout for deep focus',
            subtitle: 'Exploring muted colors and breathing space in messaging UIs.',
            imageUrl: 'image-9.jpg',
            author: 'Lena · UI',
            createdAt: new Date(Date.now() - 3 * 60 * 1000),
            likes: 27,
        },
        {
            id: 10,
            tag: 'product',
            title: 'Quiet social, not noisy feeds',
            subtitle: 'Why Synq keeps timelines feeling more like a journal than a casino.',
            imageUrl: 'image-10.jpg',
            author: 'Arman · Product',
            createdAt: new Date(Date.now() - 18 * 60 * 1000),
            likes: 54,
        },
        {
            id: 11,
            tag: 'update',
            title: 'New: synced explore & chat handoff',
            subtitle: 'Jump into a chat from any explore card without losing context.',
            imageUrl: 'image-11.jpg',
            author: 'Team Synq',
            createdAt: new Date(Date.now() - 60 * 60 * 1000),
            likes: 39,
        },
        {
            id: 12,
            tag: 'design',
            title: 'Micro-animations that don’t scream',
            subtitle: 'Subtle motion that supports focus instead of stealing it.',
            imageUrl: 'image-6.jpg',
            author: 'Mina · Motion',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            likes: 61,
        },
        {
            id: 13,
            tag: 'product',
            title: 'Building for small, real groups',
            subtitle: 'Synq is tuned for circles, not infinite follow counts.',
            imageUrl: 'image-7.jpg',
            author: 'Kian · Product',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            likes: 72,
        },
        {
            id: 14,
            tag: 'product',
            title: 'Dark mode with gentle contrast',
            subtitle: 'New palette that stays calm at 3 AM.',
            imageUrl: 'image-1.jpg',
            author: 'Team Synq',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            likes: 46,
        },
        {
            id: 15,
            tag: 'update',
            title: 'Instant matching',
            subtitle: 'Match interests and open small, real groups instantly.',
            imageUrl: 'image-3.jpg',
            author: 'Team Synq',
            createdAt: new Date(Date.now() - 30 * 60 * 1000),
            likes: 58,
        },
        {
            id: 16,
            tag: 'all',
            title :'Hi Synq',
            subtitle: 'Testing the explore grid.',
            imageUrl: 'image-16.jpg',
            author: 'Amir · Product',
            createdAt: new Date(),
            likes: 4500,
        },
    ];

    trackById(index: number, item: ExploreItem): number {
        return item.id;
    }

    private rotationTimer: any;

    ngOnInit(): void {
        this.shuffleItems();
        this.rotationTimer = setInterval(() => {
            this.rotateItems();
        }, 30_000);
    }

    ngOnDestroy(): void {
        if (this.rotationTimer) {
            clearInterval(this.rotationTimer);
        }
    }

    setTag(tag: ExploreTag): void {
        this.activeTag = tag;
    }

    get filteredItems(): ExploreItem[] {
        if (this.activeTag === 'all') return this.items;
        return this.items.filter((i) => i.tag === this.activeTag);
    }

    private shuffleItems(): void {
        this.items = [...this.items]
            .map((item) => ({ sortKey: Math.random(), item }))
            .sort((a, b) => a.sortKey - b.sortKey)
            .map((x) => x.item);
    }

    private rotateItems(): void {
        if (!this.items.length) return;
        const first = this.items[0];
        const rest = this.items.slice(1);
        const randomIndex = Math.floor(Math.random() * (rest.length + 1));
        this.items = [...rest.slice(0, randomIndex), first, ...rest.slice(randomIndex)];
    }

    getRelativeTime(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - new Date(date).getTime();
        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} h ago`;
        if (days < 7) return `${days} d ago`;
        if (weeks < 5) return `${weeks} w ago`;
        if (months < 12) return `${months} mo ago`;
        return `${years} y ago`;
    }
}
// import { Component } from '@angular/core';
// import { CommonModule, NgForOf, NgClass } from '@angular/common';
// import { RouterLink } from '@angular/router';

// type ExploreTag = 'design' | 'product' | 'update' | 'all';

// interface ExploreItem {
//   id: number;
//   tag: ExploreTag;
//   title: string;
//   subtitle: string;
//   author: string;
//   time: string;
//   likes: number;
// }

// @Component({
//   selector: 'app-explor',
//   standalone: true,
//   imports: [CommonModule, RouterLink, NgForOf, NgClass],
//   templateUrl: './explor.component.html',
//   styleUrl: './explor.component.scss'
// })

// export class ExploreComponent {
//   activeTag: ExploreTag = 'all';

//   items: ExploreItem[] = [
//     {
//       id: 1,
//       tag: 'design',
//       title: 'Soft chat layout for deep focus',
//       subtitle: 'Exploring muted colors and breathing space in messaging UIs.',
//       author: 'Lena · UI',
//       time: '3 min ago',
//       likes: 27,
//     },
//     {
//       id: 2,
//       tag: 'product',
//       title: 'Quiet social, not noisy feeds',
//       subtitle: 'Why Synq keeps timelines feeling more like a journal than a casino.',
//       author: 'Arman · Product',
//       time: '18 min ago',
//       likes: 54,
//     },
//     {
//       id: 3,
//       tag: 'update',
//       title: 'New: synced explore & chat handoff',
//       subtitle: 'Jump into a chat from any explore card without losing context.',
//       author: 'Team Synq',
//       time: '1 h ago',
//       likes: 39,
//     },
//     {
//       id: 4,
//       tag: 'design',
//       title: 'Micro-animations that don’t scream',
//       subtitle: 'Subtle motion that supports focus instead of stealing it.',
//       author: 'Mina · Motion',
//       time: 'Yesterday',
//       likes: 61,
//     },
//     {
//       id: 5,
//       tag: 'product',
//       title: 'Building for small, real groups',
//       subtitle: 'Synq is tuned for circles, not infinite follow counts.',
//       author: 'Kian · Product',
//       time: '2 days ago',
//       likes: 72,
//     },
//     {
//       id: 6,
//       tag: 'product',
//       title: 'Dark mode with gentle contrast',
//       subtitle: 'New palette that stays calm at 3 AM.',
//       author: 'Team Synq',
//       time: 'This week',
//       likes: 46,
//     },

//     {
//       id: 7,
//       tag: 'update',
//       title: 'Dark Mode',
//       subtitle: 'now',
//       author: 'Team Synq',
//       time: '2 hors',
//       likes: 2,
//     },

//     {
//       id: 8,
//       tag: 'all',
//       title: 'Hi SYNQ',
//       subtitle: 'None',
//       author: 'Team Amir',
//       time: 'This month',
//       likes: 4500,
//     },
//   ];

//   setTag(tag: ExploreTag) {
//     this.activeTag = tag;
//   }

//   get filteredItems(): ExploreItem[] {
//     if (this.activeTag === 'all') return this.items;
//     return this.items.filter(i => i.tag === this.activeTag);
//   }
// }
//
