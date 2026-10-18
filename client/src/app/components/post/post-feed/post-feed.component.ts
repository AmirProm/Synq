import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';

@Component({
    selector: 'app-feed',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './post-feed.component.html',
    styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements OnInit {
    posts: Post[] = [];
    loading = true;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.loadPosts();
    }

    loadPosts(): void {
        this.loading = true;
        this.postService.getFeed().subscribe({
            next: (res) => {
                this.posts = res || [];
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    trackByPost(index: number, post: Post): any {
        return post.id || index;
    }

    getRelativeTime(dateInput: string | Date | undefined): string {
        if (!dateInput) return '';
        const now = new Date();
        const past = new Date(dateInput);
        const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
        return past.toLocaleDateString();
    }
}
