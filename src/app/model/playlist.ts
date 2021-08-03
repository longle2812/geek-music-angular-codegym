import {Genre} from './genre';
import {User} from './user';
import {Song} from './song';

export interface Playlist {
  id?: number;
  name?: string;
  description?: string;
  genres?: Genre[];
  user?: User;
  imgUrl?: string;
  createdAt?: any;
  lastUpdated?: any;
  listenCount?: number;
  likes?: number;
  songs?: Song[];
  commentList?: any;
}
