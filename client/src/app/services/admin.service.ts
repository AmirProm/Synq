import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserWithRole } from '../models/user-with-role';
import { ApiResponse } from '../models/helpers/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _http = inject(HttpClient);
  private _apiUrl: string = environment.apiUrl + 'api/admin/';

  getUsersWithRoles(): Observable<UserWithRole[]> {
    return this._http.get<UserWithRole[]>(this._apiUrl + 'users-with-roles');
  }

  deleteUser(targetUserName: string | undefined): Observable<ApiResponse> {
    return this._http.delete<ApiResponse>(this._apiUrl + 'delete-user/' + targetUserName);
  }
}
