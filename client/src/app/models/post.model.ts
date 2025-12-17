export interface Post {
  id: string;
  userName: string;
  caption: string;
  photoUrl: string;
  createdAt: string; // ISO string
}

export interface CreatePostDto {
  caption: string;
  photoUrl: string;
}

export interface UpdatePostDto {
  caption: string;
}
