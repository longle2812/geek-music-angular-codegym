import {User} from './user';

export interface SongInteraction {
  id?: number;
  senderId?: number;
  receiverId?: number;
  songId?: number;
  comment ?: string;
  createdAt?: any;
  link?: string;
  likes ?: boolean;
   isRead ?: boolean;
}
