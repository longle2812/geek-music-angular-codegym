export interface PlaylistInteraction {
  id?: number;
  senderId?: number;
  receiverId?: number;
  playlistId?: number;
  comment?: string;
  createdAt?: string;
  link?: string;
  likes?: boolean;
  isRead?: boolean;
}
