export interface PlaylistInteraction {
  id?: number;
  senderId?: number;
  recieverId?: number;
  playlistId?: number;
  comment?:string;
  createdAt?:any;
  link?:string;
  likes?: boolean ;
  isRead?: boolean ;
}
