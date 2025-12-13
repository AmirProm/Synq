import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

export interface CreatePostDto {
  caption: string;
  photoUrl: string;
}

export interface UpdatePostDto {
  caption: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'api/posts/';

  getFeed(pageNumber = 1, pageSize = 10): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<Post[]>(this.apiUrl + 'feed', { params });
  }

  getByUser(userName: string, pageNumber = 1, pageSize = 10): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<Post[]>(this.apiUrl + 'user/' + userName, { params });
  }

  create(dto: CreatePostDto): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdatePostDto): Observable<void> {
    return this.http.put<void>(this.apiUrl + id, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id);
  }
}
