import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { PostService } from '../../../services/post.service';
@Component({
  selector: 'app-post-create',
  standalone: true,
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  private postService = inject(PostService);

  @Output() created = new EventEmitter<void>();

  caption = signal('');
  photoUrl = signal('');
  loading = signal(false);

  submit() {
    if (!this.caption().trim()) return;

    this.loading.set(true);
    this.postService.create({
      caption: this.caption(),
      photoUrl: this.photoUrl()
    }).subscribe({
      next: () => {
        this.caption.set('');
        this.photoUrl.set('');
        this.loading.set(false);
        this.created.emit();
      },
      error: () => this.loading.set(false)
    });
  }
}
