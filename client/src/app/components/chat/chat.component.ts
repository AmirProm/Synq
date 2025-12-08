import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSerivce } from '../../services/chat.service';
import { LoggedIn } from '../../models/logged-in.model';
import { ChatMessage } from '../../models/chat-massage.model';
import { DatePipe } from '@angular/common';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, PickerModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class Chat implements OnInit {
  private chatService = inject(ChatSerivce);

  messageText = '';
  messages = this.chatService.messages;

  currentUser: LoggedIn | null = null;

  ngOnInit(): void {
    this.currentUser = this.getCurrentUser();

    this.chatService.startConnection();
    this.chatService.loadMessage().subscribe();
  }

  getCurrentUser(): LoggedIn | null {
    const currentUser: string | null = localStorage.getItem('loggedInUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  isMine(message: ChatMessage): boolean {
    if (!this.currentUser) return false;
    return message.user === this.currentUser.userName;
  }

  sendMessage(): void {
    if (!this.currentUser) return;
    if (!this.messageText.trim()) return;

    this.chatService.sendMessage(this.currentUser.userName, this.messageText);
    this.messageText = '';
  }
  showEmojis = false;

  addEmoji(event: any) {
    this.messageText += event.emoji.native;
    this.showEmojis = false;
  }

}