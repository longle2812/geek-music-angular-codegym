import {User} from './user';

export interface SingerInteraction {
  id?: number;
  senderId?: number;
  receiverId?: number;
  playlistId?: number;
  singerId?: number;
  comment?: string;
  createdAt?: string;
  link?: string;
  likes?: boolean;
  isRead?: boolean;
  sender?: User;
}
