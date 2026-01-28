// // src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePostWithPhotoDto, PostDto, UpdatePostDto } from '../models/post.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment + 'api/posts';

  constructor(private http: HttpClient) { }

  createWithPhoto(dto: CreatePostWithPhotoDto): Observable<PostDto> {
    const formData = new FormData();
    if (dto.caption) formData.append('Caption', dto.caption);
    formData.append('File', dto.file);

    return this.http.post<PostDto>(`${this.baseUrl}/create-with-photo`, formData);
  }

  getFeed(pageNumber: number = 1, pageSize: number = 10): Observable<PostDto[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PostDto[]>(`${this.baseUrl}/feed`, { params });
  }

  getByUser(userName: string, pageNumber: number = 1, pageSize: number = 10): Observable<PostDto[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PostDto[]>(`${this.baseUrl}/user/${userName}`, { params });
  }

  getMyCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/my/count`);
  }

  getUserCount(userName: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/${userName}/count`);
  }

  update(id: string, dto: UpdatePostDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}