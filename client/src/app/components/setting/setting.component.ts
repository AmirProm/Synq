import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AccountService } from '../../services/account.service';

export type SettingsTab = 'profile' | 'preferences' | 'privacy' | 'danger';
export type LanguageCode = 'en' | 'fa';

export interface UserSettings {
  userName: string;
  email: string;
  displayName: string;
  statusNote: string;
  bio: string;
  allowDirectMessages: boolean;
  showOnlineStatus: boolean;
  darkMode: boolean;
  soundEffects: boolean;
  compactMode: boolean;
  language: LanguageCode;
}

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  accountService = inject(AccountService);

  activeTab = signal<SettingsTab>('profile');

  languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English (US)', flag: '🇺🇸' },
    { code: 'fa', label: 'فارسی (Persian)', flag: '🇮🇷' },
  ];

  get formattedHandle(): string {
    return '@' + (this.settings.userName || '');
  }

  settings: UserSettings = {
    userName: 'synq_user',
    email: 'user@synq.network',
    displayName: 'Amir',
    statusNote: 'Building Synq 🚀',
    bio: 'Full-stack developer passionate about distributed systems and real-time social nodes.',
    allowDirectMessages: true,
    showOnlineStatus: true,
    darkMode: false,
    soundEffects: true,
    compactMode: false,
    language: 'en',
  };

  isSaving = false;
  saveToast = signal<string | null>(null);

  ngOnInit(): void {
    const currentUser = this.accountService.loggedInUserSig();
    if (currentUser) {
      this.settings.userName = currentUser.userName || 'user';
      // استفاده ایمن بدون ارور تایپ‌اسکریپت:
      const anyUser = currentUser as any;
      this.settings.displayName = anyUser.knownAs || currentUser.userName || 'Member';
      this.settings.email = anyUser.email || `${currentUser.userName}@synq.network`;
    }
  }


  setTab(tab: SettingsTab): void {
    this.activeTab.set(tab);
  }

  toggleTheme(): void {
    if (this.settings.darkMode) {
      document.body.classList.add('synq-dark-theme');
    } else {
      document.body.classList.remove('synq-dark-theme');
    }
  }

  saveSettings(): void {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.showToast('All preferences synced successfully!');
    }, 450);
  }

  showToast(message: string): void {
    this.saveToast.set(message);
    setTimeout(() => this.saveToast.set(null), 3500);
  }

  logout(): void {
    this.accountService.logout();
  }
}
