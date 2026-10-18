import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  signal,
  effect
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { take } from 'rxjs';
import { ChatSerivce } from '../../services/chat.service';
import { AccountService } from '../../services/account.service';
import { LoggedIn } from '../../models/logged-in.model';
import { ChatMessage } from '../../models/chat-massage.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, PickerModule, DatePipe, TitleCasePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class Chat implements OnInit {
  private chatService = inject(ChatSerivce);
  private accountService = inject(AccountService);

  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;

  messageText = '';
  messages = this.chatService.messages;
  currentUser: LoggedIn | null = null;
  isadmin = false;
  showEmojis = false;

  constructor() {
    // Automatically scroll down when new messages arrive
    effect(() => {
      const list = this.messages();
      if (list && list.length > 0) {
        setTimeout(() => this.scrollToBottom(), 50);
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.getCurrentUser();

    if (this.currentUser?.roles) {
      this.isadmin = this.currentUser.roles.includes('admin');
    }

    this.chatService.startConnection();
    this.chatService
      .loadMessage()
      .pipe(take(1))
      .subscribe({
        next: () => setTimeout(() => this.scrollToBottom(), 100)
      });
  }

  getCurrentUser(): LoggedIn | null {
    const userStr = localStorage.getItem('loggedInUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isMine(message: ChatMessage): boolean {
    return !!(
      this.currentUser?.userName &&
      message.user?.toLowerCase() === this.currentUser.userName.toLowerCase()
    );
  }

  sendMessage(): void {
    if (!this.currentUser?.userName || !this.messageText.trim()) return;

    this.chatService.sendMessage(this.currentUser.userName, this.messageText.trim());
    this.messageText = '';
    this.showEmojis = false;
  }

  deleteMessage(message: ChatMessage): void {
    if (!this.isadmin || !message.id) return;

    if (window.confirm('Delete this message?')) {
      this.chatService.deleteMessage(message.id).subscribe();
    }
  }

  toggleEmojis(): void {
    this.showEmojis = !this.showEmojis;
  }

  addEmoji(event: any): void {
    const emoji = event?.emoji?.native;
    if (emoji) {
      this.messageText += emoji;
    }
    this.showEmojis = false;
  }

  scrollToBottom(): void {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
