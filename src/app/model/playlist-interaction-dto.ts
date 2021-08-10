export interface PlaylistInteractionDTO {
  senderId?: number;
  recieverId?: number;
  playlistId?: number;
  comment?:string;
  link?:string;
  likes?: boolean ;
  isRead?: boolean ;
}
