import {User} from './user';

export interface SongInteractionDTO {
  senderId?: number;
  receiverId?: number;
  songId?: number;
  comment ?: string;
  link?: string;
  likes ?: boolean;
  isRead ?: boolean;
}
