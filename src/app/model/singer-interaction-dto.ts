export interface SingerInteractionDTO {
  senderId?: number;
  recieverId?: number;
  singerId?: number;
  comment?:string;
  link?:string;
  likes?: boolean ;
  isRead?: boolean ;
}
