
export interface PostDto {
  id: string;
  userName: string;
  caption: string;
  photoUrl: string;
  createdAt: Date;
}

export interface CreatePostWithPhotoDto {
  caption?: string;
  file: File;
}

export interface UpdatePostDto {
  caption?: string;
}