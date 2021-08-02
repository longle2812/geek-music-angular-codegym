import {Genre} from './genre';
import {User} from './user';

export interface Playlist {
  id?: number;
  name?: string;
  description?: string;
  genres?: Genre[];
  user?: User;
  imgUrl?: string;
}
