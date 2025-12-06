import { computed, inject, Injectable, signal } from '@angular/core';
import { ChatStorageService } from './chat-storage.service';
import { ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _chatStorageService = inject(ChatStorageService);

  username = signal<string>('');
  messages = signal<ChatMessage[]>([]);
  typingUser = signal<string>('');

  messageCount = computed(() => this.messages.length);

  setUsername(name: string): void {
    this.username.set(name.trim());

    this._chatStorageService.saveUsername(this.username());
  }

  loadUsernameFromStorage(): void {
    const u = this._chatStorageService.getUsername();

    if (u)
      this.username.set(u);
  }

  append(text: string): void {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      author: this.username() || 'Anonymous',
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    this.messages.update(list => [...list, msg]);
  }

  clearChat(): void {
    this.messages.set([]);
  }
}