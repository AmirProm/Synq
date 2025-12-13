import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostCreateComponent } from '../post-create/post-create.component';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    PostCreateComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent {
  private postService = inject(PostService);

  posts = signal<Post[]>([]);
  page = 1;

  ngOnInit() {
    this.load();
  }

  load() {
    this.postService.getFeed(this.page, 10).subscribe(res => {
      this.posts.set(res);
    });
  }

  deletePost(id: string) {
    this.postService.delete(id).subscribe(() => {
      this.posts.update(p => p.filter(x => x.id !== id));
    });
  }
}
