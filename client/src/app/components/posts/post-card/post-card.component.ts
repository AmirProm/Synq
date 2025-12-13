import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports:[DatePipe],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Output() delete = new EventEmitter<string>();
}
