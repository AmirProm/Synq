import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStorageService {
  MSG_KEY = 'simple_chat_messages';
  USER_KEY = 'simple_chat_username';

  getMesage(): ChatMessage[] {
    const messageStr = sessionStorage.getItem(this.MSG_KEY);
    return messageStr ? (JSON.parse(messageStr) as ChatMessage[]) : [];
  }

  saveMesssages(list: ChatMessage[]): void {
    sessionStorage.setItem(this.MSG_KEY, JSON.stringify(list));
  }

  getUsername(): string | null {
    return sessionStorage.getItem(this.USER_KEY);
  }

  saveUsername(name: string): void {
    sessionStorage.setItem(this.USER_KEY, name);
  }

  clearAll(): void {
    sessionStorage.clear();
  }
}