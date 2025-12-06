import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

export interface ChatMessage {
  id?: string;
  author: string | null;
  text: string;
  createdAt: string | Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  private readonly chatService = inject(ChatService);

  text = '';
  name = '';
  typing = signal<string>('');

  @ViewChild('scroller') scroller!: ElementRef<HTMLDivElement>;

  private typingTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    // اگر سرویس نام کاربری را از استوریج می‌خواند، اینجا صدا زده می‌شود
    if (this.chatService.loadUsernameFromStorage) {
      this.chatService.loadUsernameFromStorage();
    }
    this.name = this.chatService.username?.() ?? '';

    // هر بار که پیام‌ها عوض شوند، اسکرول می‌کنیم پایین
    effect(() => {
      // فرض: messages() یک سیگنال از نوع ChatMessage[] است
      this.chatService.messages?.();
      queueMicrotask(() => this.scrollToBottom());
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  get currentUsername(): string {
    return this.chatService.username?.() ?? '';
  }

  get messages(): ChatMessage[] {
    return (this.chatService.messages?.() ?? []) as ChatMessage[];
  }

  send(): void {
    const trimmed = this.text.trim();
    if (!trimmed) return;

    if (!this.currentUsername) {
      // اگر نام انتخاب نشده باشد، اجازه ارسال نده
      alert('اول یک نام نمایشی انتخاب کن.');
      return;
    }

    if (this.chatService.append) {
      this.chatService.append(trimmed);
    }

    this.text = '';
    this.typing.set('');
  }

  onTyping(): void {
    const displayName = this.currentUsername || 'Someone';
    this.typing.set(`${displayName} is typing…`);

    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
    this.typingTimer = setTimeout(() => this.typing.set(''), 900);
  }

  saveName(): void {
    const trimmed = this.name.trim();
    if (!trimmed) return;

    if (this.chatService.setUsername) {
      this.chatService.setUsername(trimmed);
    }
  }

  clearAll(): void {
    if (!confirm('Clear all messages and username for this session?')) return;

    if (this.chatService.clearChat) {
      this.chatService.clearChat();
    }

    this.name = '';
    try {
      sessionStorage.removeItem('simple_chat_username');
    } catch {
      // ignore
    }
  }

  private scrollToBottom(): void {
    if (!this.scroller) return;
    const el = this.scroller.nativeElement;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }
}

// import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
// import { ChatService } from '../../services/chat.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-chat',
//   imports: [
//     CommonModule, FormsModule
//   ],
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.scss'
// })
// export class ChatComponent implements OnInit, AfterViewInit {
//   chatService = inject(ChatService);

//   text = '';
//   name = '';
//   typing = signal<string>('');
//   private typingTimer?: any;

//   @ViewChild('scroller') scroller!: ElementRef<HTMLDivElement>;

//   ngOnInit(): void {
//     this.chatService.loadUsernameFromStorage();
//     this.name = this.chatService.username();

//     effect(() => {
//       this.chatService.messages();
//       queueMicrotask(() => this.scrollToBottom());
//     })
//   }

//   ngAfterViewInit(): void {
//     this.scrollToBottom();
//   }

//   send(): void {
//     const t = this.text.trim();

//     if (!t) return;

//     this.chatService.append(t);
//     this.text = '';
//     this.typing.set(t);
//   }

//   onTyping(): void {
//     const u = this.chatService.username || 'Someone';

//     this.typing.set(`${u} is typing...`);
//     clearTimeout(this.typingTimer);
//     this.typingTimer = setTimeout(() => this.typing.set(''), 900);
//   }

//   saveName(): void {
//     if (this.name.trim()) this.chatService.setUsername(this.name.trim());
//   }

//   clearAll(): void {
//     if (confirm('Clear all messages and username for this session?')) {
//       this.chatService.clearChat();
//       this.name = '';
//       sessionStorage.removeItem('simple_chat_username');
//     }
//   }

//   private scrollToBottom(): void {
//     const el = this.scroller.nativeElement;

//     if (!el) return;

//     el.scrollTop = el.scrollHeight;
//   }
// }