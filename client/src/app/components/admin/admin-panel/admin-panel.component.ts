// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { take } from 'rxjs';
// import { AdminService } from '../../../services/admin.service';
// import { UserWithRole } from '../../../models/user-with-role';

// @Component({
//   selector: 'app-admin-panel',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatTableModule,
//     MatButtonModule,
//     MatIconModule
//   ],
//   templateUrl: './admin-panel.component.html',
//   styleUrl: './admin-panel.component.scss'
// })
// export class AdminPanelComponent implements OnInit {
//   private _adminService = inject(AdminService);
//   private _snackbar = inject(MatSnackBar);

//   usersWithRoles: UserWithRole[] = [];
//   searchQuery: string = '';
//   userToDelete: { index: number; userName: string } | null = null;
//   isLoading: boolean = false;

//   ngOnInit(): void {
//     this.showAllUsersWithRoles();
//   }

//   showAllUsersWithRoles(): void {
//     this.isLoading = true;
//     this._adminService.getUsersWithRoles().pipe(take(1)).subscribe({
//       next: (users) => {
//         this.usersWithRoles = users || [];
//         this.isLoading = false;
//       },
//       error: () => {
//         this.isLoading = false;
//         this._snackbar.open('Failed to load users', 'Close', {
//           duration: 4000,
//           verticalPosition: 'top',
//           horizontalPosition: 'center'
//         });
//       }
//     });
//   }

//   get filteredUsers(): UserWithRole[] {
//     if (!this.searchQuery.trim()) {
//       return this.usersWithRoles;
//     }
//     const q = this.searchQuery.toLowerCase().trim();
//     return this.usersWithRoles.filter(u => u.userName?.toLowerCase().includes(q));
//   }

//   getAdminCount(): number {
//     return this.usersWithRoles.filter(user =>
//       user.roles && user.roles.some(r => r.toLowerCase() === 'admin')
//     ).length;
//   }

//   getModeratorCount(): number {
//     return this.usersWithRoles.filter(user =>
//       user.roles && user.roles.some(r => r.toLowerCase() === 'moderator')
//     ).length;
//   }

//   getMemberCount(): number {
//     return this.usersWithRoles.filter(user =>
//       user.roles &&
//       user.roles.some(r => r.toLowerCase() === 'member') &&
//       !user.roles.some(r => r.toLowerCase() === 'admin')
//     ).length;
//   }

//   hasRole(roles: string[], targetRole: string): boolean {
//     if (!roles) return false;
//     return roles.some(r => r.toLowerCase() === targetRole.toLowerCase());
//   }

//   promptDelete(index: number, userName: string): void {
//     this.userToDelete = { index, userName };
//   }

//   cancelDelete(): void {
//     this.userToDelete = null;
//   }

//   confirmDelete(): void {
//     if (!this.userToDelete) return;
//     const { index, userName } = this.userToDelete;

//     this._adminService.deleteUser(userName).pipe(take(1)).subscribe({
//       next: (res) => {
//         this._snackbar.open(res.message || `User ${userName} deleted`, 'Close', {
//           duration: 5000,
//           horizontalPosition: 'center',
//           verticalPosition: 'top'
//         });

//         // Immutable update
//         this.usersWithRoles = [
//           ...this.usersWithRoles.slice(0, index),
//           ...this.usersWithRoles.slice(index + 1)
//         ];
//         this.userToDelete = null;
//       },
//       error: () => {
//         this._snackbar.open(`Failed to delete ${userName}`, 'Close', {
//           duration: 4000,
//           horizontalPosition: 'center',
//           verticalPosition: 'top'
//         });
//         this.userToDelete = null;
//       }
//     });
//   }
// }


import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { UserWithRole } from '../../../models/user-with-role';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  private _adminService = inject(AdminService);
  private _snackbar = inject(MatSnackBar);

  usersWithRoles: UserWithRole[] = [];
  searchQuery: string = '';
  userToDelete: { index: number; userName: string } | null = null;
  isLoading: boolean = false;

  // محیط دایره استاندارد SVG با r=15.9155 تقریبا برابر 100 است
  readonly CIRCLE_CIRCUMFERENCE = 100;

  ngOnInit(): void {
    this.showAllUsersWithRoles();
  }

  showAllUsersWithRoles(): void {
    this.isLoading = true;
    this._adminService.getUsersWithRoles().pipe(take(1)).subscribe({
      next: (users) => {
        this.usersWithRoles = users || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this._snackbar.open('Failed to load users', 'Close', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  get filteredUsers(): UserWithRole[] {
    if (!this.searchQuery.trim()) {
      return this.usersWithRoles;
    }
    const q = this.searchQuery.toLowerCase().trim();
    return this.usersWithRoles.filter(u => u.userName?.toLowerCase().includes(q));
  }

  getAdminCount(): number {
    return this.usersWithRoles.filter(user =>
      user.roles && user.roles.some(r => r.toLowerCase() === 'admin')
    ).length;
  }

  getModeratorCount(): number {
    return this.usersWithRoles.filter(user =>
      user.roles && user.roles.some(r => r.toLowerCase() === 'moderator')
    ).length;
  }

  getMemberCount(): number {
    return this.usersWithRoles.filter(user =>
      user.roles &&
      user.roles.some(r => r.toLowerCase() === 'member') &&
      !user.roles.some(r => r.toLowerCase() === 'admin')
    ).length;
  }

  // محاسبات درصدی برای نمودارها
  getAdminPercentage(): number {
    if (!this.usersWithRoles.length) return 0;
    return Math.round((this.getAdminCount() / this.usersWithRoles.length) * 100);
  }

  getModeratorPercentage(): number {
    if (!this.usersWithRoles.length) return 0;
    return Math.round((this.getModeratorCount() / this.usersWithRoles.length) * 100);
  }

  getMemberPercentage(): number {
    if (!this.usersWithRoles.length) return 0;
    return Math.max(0, 100 - (this.getAdminPercentage() + this.getModeratorPercentage()));
  }

  // آفست‌های SVG برای رندر بدون درز دونات چارت
  getAdminOffset(): number {
    return 25; // شروع از ساعت ۱۲
  }

  getModeratorOffset(): number {
    return 25 - this.getAdminPercentage();
  }

  getMemberOffset(): number {
    return 25 - (this.getAdminPercentage() + this.getModeratorPercentage());
  }

  hasRole(roles: string[], targetRole: string): boolean {
    if (!roles) return false;
    return roles.some(r => r.toLowerCase() === targetRole.toLowerCase());
  }

  promptDelete(index: number, userName: string): void {
    this.userToDelete = { index, userName };
  }

  cancelDelete(): void {
    this.userToDelete = null;
  }

  confirmDelete(): void {
    if (!this.userToDelete) return;
    const { index, userName } = this.userToDelete;

    this._adminService.deleteUser(userName).pipe(take(1)).subscribe({
      next: (res) => {
        this._snackbar.open(res.message || `User ${userName} deleted`, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.usersWithRoles = [
          ...this.usersWithRoles.slice(0, index),
          ...this.usersWithRoles.slice(index + 1)
        ];
        this.userToDelete = null;
      },
      error: () => {
        this._snackbar.open(`Failed to delete ${userName}`, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.userToDelete = null;
      }
    });
  }
}
