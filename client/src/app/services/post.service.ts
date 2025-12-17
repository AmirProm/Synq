import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private base = environment.apiUrl + 'api/posts/';

  // ---------- GET FEED ----------
  getFeed(pageNumber = 1, pageSize = 12): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<Post[]>(this.base + 'feed', { params });
  }

  // ---------- GET BY USER ----------
  getByUser(userName: string, pageNumber = 1, pageSize = 12): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<Post[]>(this.base + `user/${encodeURIComponent(userName)}`, { params });
  }

  // ---------- COUNTS ----------
  // ✅ [Authorize] GET /api/posts/my/count
  getMyCount(): Observable<number> {
    return this.http.get<number>(this.base + 'my/count');
  }

  // GET /api/posts/user/{userName}/count
  getUserCount(userName: string): Observable<number> {
    return this.http.get<number>(this.base + `user/${encodeURIComponent(userName)}/count`);
  }

  // ---------- UPDATE / DELETE ----------
  // ✅ [Authorize] PUT /api/posts/{id}
  updateCaption(id: string, caption: string): Observable<void> {
    return this.http.put<void>(this.base + encodeURIComponent(id), { caption });
  }

  // ✅ [Authorize] DELETE /api/posts/{id}
  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.base + encodeURIComponent(id));
  }

  // اگر multipart داری (create-with-photo):
  // endpoint رو اگر اسمش فرق داره عوض کن
  createWithPhoto(caption: string, file: File): Observable<Post> {
    const fd = new FormData();
    fd.append('caption', caption ?? '');
    fd.append('File', file);
    return this.http.post<Post>(this.base + 'create-with-photo', fd);
  }
}


// createJson(caption: string, photoUrl: string): Observable<Post> {
//   return this.http.post<Post>(this.base, { caption, photoUrl });
// }