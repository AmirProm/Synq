import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserWithRole } from '../../../models/user-with-role';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  private _adminService = inject(AdminService);
  private _snackbar = inject(MatSnackBar);

  displayedColumns = ['no', 'username', 'active-roles', 'delete-user'];
  usersWithRoles: UserWithRole[] = [];

  spread(): void {
    const arr = [1, 2, 3];
    const newArr = [...arr];

    arr.push(4);

    console.log(arr);
    console.log(newArr);
  }

  removeItem(): void {
    const numbers: number[] = [1, 2, 3, 4, 5];
    const index: number = 2;

    const before = numbers.slice(0, index);
    const after = numbers.slice(index + 1);

    const newNumbers = [...before, ...after];

    console.log('Original:', numbers);
    console.log('Before:', before);
    console.log('After:', after);
    console.log('Final list:', newNumbers);
  }

  slice(): void {
    let numbers: number[] = [10, 20, 30, 40, 50];

    let result1 = numbers.slice(1, 4);
    let result2 = numbers.slice(1);
    let result3 = numbers.slice(1 + 1);

    console.log('Result 1:', result1);
    console.log('Result 2:', result2);
    console.log('Result 3:', result3);
  }

  ngOnInit(): void {
    this.showAllUsersWithRoles();
  }

  showAllUsersWithRoles(): void {
    this._adminService.getUsersWithRoles()
      .pipe(take(1))
      .subscribe({
        next: (res) => this.usersWithRoles = res
      });
  }

  deleteUser(index: number, userName: string): void {
    this._adminService.deleteUser(userName)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this._snackbar.open(res.message, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 7000
          });

          if (this.usersWithRoles)
            this.usersWithRoles = [
              ...this.usersWithRoles.slice(0, index),
              ...this.usersWithRoles.slice(index + 1)
            ]
        }
      });
  }
  
  getAdminCount(): number {
    return this.usersWithRoles.filter(user =>
      user.roles.includes('admin') && user.roles.includes('moderator')
    ).length;
  }

  getMemberCount(): number {
    return this.usersWithRoles.filter(user =>
      user.roles.includes('member') && !user.roles.includes('admin')
    ).length;
  }
}
