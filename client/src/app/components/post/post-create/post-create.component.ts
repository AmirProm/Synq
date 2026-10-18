import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<void>();

  caption = '';
  isSubmitting = false;

  constructor(private postService: PostService) {}

  create(): void {
    const trimmed = this.caption.trim();
    if (!trimmed || this.isSubmitting) return;

    this.isSubmitting = true;
    this.postService.createPost(trimmed).subscribe({
      next: () => {
        this.caption = '';
        this.isSubmitting = false;
        this.postCreated.emit();
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}
