import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-post-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-panel.component.html',
  styleUrls: ['./post-panel.component.scss']
})
export class PostPanelComponent {
  private postService = inject(PostService);
  private accountService = inject(AccountService);
  private router = inject(Router);

  // Tabs: posts | explore
  tabSig = signal<'posts' | 'explore'>('posts');

  // Create form
  captionSig = signal('');
  photoUrlSig = signal('');
  creatingSig = signal(false);

  // Feed state
  postsSig = signal<Post[]>([]);
  loadingSig = signal(false);
  pageSig = signal(1);
  pageSizeSig = signal(8);
  canLoadMoreSig = signal(true);

  // Edit state
  editingIdSig = signal<string | null>(null);
  editCaptionSig = signal('');

  meUserNameSig = computed(() => this.accountService.loggedInUserSig()?.userName ?? '');

  ngOnInit() {
    this.refresh();
  }

  // -------- Tabs ----------
  goExplore() {
    // اگر explore route داری:
    this.router.navigateByUrl('/explor');
  }

  // -------- Feed ----------
  refresh() {
    this.pageSig.set(1);
    this.canLoadMoreSig.set(true);
    this.postsSig.set([]);
    this.loadMore(true);
  }

  loadMore(reset = false) {
    if (this.loadingSig() || !this.canLoadMoreSig()) return;

    this.loadingSig.set(true);
    const page = this.pageSig();
    const size = this.pageSizeSig();

    this.postService.getFeed(page, size).subscribe({
      next: (items) => {
        if (reset) this.postsSig.set(items);
        else this.postsSig.set([...this.postsSig(), ...items]);

        // اگر کمتر از pageSize آمد یعنی دیگه چیزی نیست
        if (!items || items.length < size) this.canLoadMoreSig.set(false);
        else this.pageSig.set(page + 1);

        this.loadingSig.set(false);
      },
      error: () => this.loadingSig.set(false)
    });
  }

  // -------- Create ----------
  createPost() {
    const caption = this.captionSig().trim();
    const photoUrl = this.photoUrlSig().trim();

    if (!caption && !photoUrl) return;

    this.creatingSig.set(true);
    this.postService.create({
      caption,
      photoUrl
    }).subscribe({
      next: (created) => {
        // پست جدید رو بذار بالا (UX بهتر)
        this.postsSig.set([created, ...this.postsSig()]);
        this.captionSig.set('');
        this.photoUrlSig.set('');
        this.creatingSig.set(false);
      },
      error: () => this.creatingSig.set(false)
    });
  }

  // -------- Edit ----------
  startEdit(p: Post) {
    this.editingIdSig.set(p.id);
    this.editCaptionSig.set(p.caption ?? '');
  }

  cancelEdit() {
    this.editingIdSig.set(null);
    this.editCaptionSig.set('');
  }

  saveEdit(p: Post) {
    const newCap = this.editCaptionSig().trim();
    if (!newCap) return;

    this.postService.updateCaption(p.id, newCap).subscribe({
      next: () => {
        this.postsSig.set(
          this.postsSig().map(x => x.id === p.id ? { ...x, caption: newCap } : x)
        );
        this.cancelEdit();
      }
    });
  }

  // -------- Delete ----------
  deletePost(p: Post) {
    const prev = this.postsSig();
    this.postsSig.set(prev.filter(x => x.id !== p.id));

    this.postService.delete(p.id).subscribe({
      error: () => this.postsSig.set(prev)
    });
  }

  // -------- Helpers ----------
  canManage(p: Post) {
    // فقط برای پست‌های خودت دکمه Edit/Delete نشون بده
    return (p.userName ?? '').toLowerCase() === this.meUserNameSig().toLowerCase();
  }
}
